import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import {
  ArrowLeft,
  Mic,
  MicOff,
  RefreshCw,
  ArrowRight,
  Flame,
  TrendingUp,
} from "lucide-react";
import { speechAPI } from "../utils/api";
import { useUser } from "../context/UserContext";

// Practice sentences
const SENTENCES = {
  vowels: [
    "Open vowel sounds help improve clarity",
    "The owl and the eagle soar overhead",
    "Amazing ocean waves are awesome",
    "I enjoy eating apples every afternoon",
  ],
  fluency: [
    "The quick brown fox jumps over the lazy dog",
    "I enjoy walking in the park every morning",
    "She reads books before going to sleep",
    "The weather is beautiful today",
  ],
  general: [
    "Hello, how are you doing today?",
    "My favorite color is deep blue",
    "Practice makes perfect every time",
    "Technology improves our daily lives",
  ],
};

interface AnalysisResult {
  transcription: { text: string; confidence: number };
  scoring: {
    finalScore: number;
    color: string;
    accuracy: number;
    fluency: number;
    prosody: number;
    wpm: number;
    duration: number;
    wordComparison: Array<{
      expected: string;
      spoken: string;
      correct: boolean;
      expected_syllables: string[];
      spoken_syllables: string[];
    }>;
  };
  feedback: {
    message: string;
    tips: string[];
    encouragement: string;
  };
}

interface SessionData {
  attempts: number;
  scores: number[];
  streak: number;
  bestScore: number;
  avgScore: number;
}

export function Practice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useUser();

  const focus = searchParams.get("focus") || "general";
  const langCode = searchParams.get("lang") || "en-US";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<SessionData>({
    attempts: 0,
    scores: [],
    streak: 0,
    bestScore: 0,
    avgScore: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const sentences =
    SENTENCES[focus as keyof typeof SENTENCES] || SENTENCES.general;
  const currentSentence = sentences[currentIndex];

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      setError("Please log in to use the practice feature.");
    }
  }, [user]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        await analyzeAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
      setResult(null);

      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          stopRecording();
        }
      }, 10000);
    } catch (err) {
      setError(
        "Microphone access denied. Please allow microphone permissions."
      );
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      console.log("🎤 Audio captured, size:", audioBlob.size, "bytes");

      // Convert to base64 (backend handles mock analysis)
      const base64Audio = await blobToBase64(audioBlob);

      console.log("📤 Sending to backend for analysis...");

      // Call speech analysis service via backend
      const response = await speechAPI.analyze(
        base64Audio,
        currentSentence,
        langCode,
        sessionData.streak
      );

      console.log("✅ Response received:", response);

      if (response.success && response.data) {
        setResult(response.data as AnalysisResult);

        // Update session data
        const score = response.data.scoring.finalScore;
        const newStreak = score >= 80 ? sessionData.streak + 1 : 0;
        const newScores = [...sessionData.scores, score];
        const newBestScore = Math.max(sessionData.bestScore, score);
        const newAvgScore = Math.round(
          newScores.reduce((a, b) => a + b, 0) / newScores.length
        );

        setSessionData({
          attempts: sessionData.attempts + 1,
          scores: newScores,
          streak: newStreak,
          bestScore: newBestScore,
          avgScore: newAvgScore,
        });
      } else {
        console.error("❌ API returned error:", response);
        setError(
          response.error || "Failed to analyze speech. Please try again."
        );
      }
    } catch (err: any) {
      console.error("❌ Analysis error:", err);

      // More specific error messages
      if (err.message?.includes("Failed to fetch")) {
        setError(
          "Cannot connect to backend. Check if it's running on port 5000."
        );
      } else if (
        err.message?.includes("Unauthorized") ||
        err.message?.includes("401")
      ) {
        setError("Please log in again. Your session may have expired.");
      } else {
        setError(err.message || "Server error. Check console for details.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(",")[1]); // Remove data:audio/webm;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleNextSentence = () => {
    setCurrentIndex((currentIndex + 1) % sentences.length);
    setResult(null);
    setError(null);
  };

  const handleTryAgain = () => {
    setResult(null);
    setError(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 50) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreRingColor = (color: string) => {
    if (color === "green") return "from-green-500 to-green-600";
    if (color === "yellow") return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <TopBar
        title={`${focus.charAt(0).toUpperCase() + focus.slice(1)} Practice`}
        showBack
      />
      {!user ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to use the practice feature.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          {/* Header Stats */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-orange-50 rounded-full flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-700">
                  {sessionData.streak} Day Streak
                </span>
              </div>
              <div className="px-4 py-2 bg-blue-50 rounded-full flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-700">
                  Avg: {sessionData.avgScore}%
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Attempt {sessionData.attempts + 1} • Best: {sessionData.bestScore}
              %
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel: Sentence */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Sentence */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border-2 border-primary/20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center leading-relaxed">
                  {currentSentence}
                </h2>
              </div>

              {/* Recording Interface */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col items-center gap-6">
                  {/* Microphone Button */}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isAnalyzing}
                    className={`
                    w-32 h-32 rounded-full flex items-center justify-center transition-all transform
                    ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 animate-pulse scale-105"
                        : isAnalyzing
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary hover:bg-primary-dark hover:scale-105"
                    }
                    shadow-lg hover:shadow-xl
                  `}
                  >
                    {isRecording ? (
                      <MicOff className="w-12 h-12 text-white" />
                    ) : (
                      <Mic className="w-12 h-12 text-white" />
                    )}
                  </button>

                  {/* Status Message */}
                  <div className="text-center min-h-[60px]">
                    {!isRecording && !isAnalyzing && !result && (
                      <p className="text-lg text-gray-600">
                        Tap the microphone and read the sentence aloud
                      </p>
                    )}
                    {isRecording && (
                      <p className="text-lg text-red-600 font-semibold animate-pulse">
                        🎤 Recording... Click to stop
                      </p>
                    )}
                    {isAnalyzing && (
                      <p className="text-lg text-primary font-semibold animate-pulse">
                        ✨ Analyzing your speech...
                      </p>
                    )}
                    {error && (
                      <p className="text-lg text-red-600 font-semibold">
                        ❌ {error}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Results Display */}
              {result && (
                <div className="space-y-6">
                  {/* Score Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Score Ring */}
                      <div className="relative w-40 h-40">
                        <svg className="transform -rotate-90 w-40 h-40">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#E5E7EB"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="url(#scoreGradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${
                              (result.scoring.finalScore / 100) * 440
                            } 440`}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient
                              id="scoreGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                className={`${getScoreRingColor(
                                  result.scoring.color
                                )
                                  .split(" ")[0]
                                  .replace("from-", "stop-color-")}`}
                              />
                              <stop
                                offset="100%"
                                className={`${getScoreRingColor(
                                  result.scoring.color
                                )
                                  .split(" ")[1]
                                  .replace("to-", "stop-color-")}`}
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-gray-900">
                            {Math.round(result.scoring.finalScore)}
                          </span>
                          <span className="text-sm text-gray-500">
                            Clarity Score
                          </span>
                        </div>
                      </div>

                      {/* Score Breakdown */}
                      <div className="flex-1 space-y-3 w-full">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Word Accuracy</span>
                            <span className="font-medium">
                              {Math.round(result.scoring.accuracy)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-500"
                              style={{ width: `${result.scoring.accuracy}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Fluency</span>
                            <span className="font-medium">
                              {Math.round(result.scoring.fluency)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${result.scoring.fluency}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Prosody</span>
                            <span className="font-medium">
                              {Math.round(result.scoring.prosody)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${result.scoring.prosody}%` }}
                            />
                          </div>
                        </div>
                        <div className="pt-3 flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Speaking Speed
                          </span>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {result.scoring.wpm}
                            </div>
                            <div className="text-xs text-gray-500">
                              words/min
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feedback */}
                    <div
                      className={`mt-6 p-4 rounded-xl ${getScoreColor(
                        result.scoring.finalScore
                      )}`}
                    >
                      <p className="font-semibold text-center text-lg">
                        {result.feedback.message}
                      </p>
                    </div>
                  </div>

                  {/* Transcription */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">You said:</div>
                    <div className="text-lg font-medium text-gray-900">
                      {result.transcription.text || "(no speech detected)"}
                    </div>
                  </div>

                  {/* Word Comparison */}
                  {result.scoring.wordComparison &&
                    result.scoring.wordComparison.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          📝 Word-by-Word Analysis
                        </h3>
                        <div className="space-y-3">
                          {result.scoring.wordComparison.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="text-2xl">
                                {item.correct ? "✓" : "✗"}
                              </div>
                              <div className="flex-1 grid grid-cols-2 gap-3">
                                <div
                                  className={`p-2 rounded-lg ${
                                    item.correct
                                      ? "bg-green-50 border-2 border-green-200"
                                      : "bg-red-50 border-2 border-red-200"
                                  }`}
                                >
                                  <div className="text-xs text-gray-600 mb-1">
                                    Expected
                                  </div>
                                  <div className="font-semibold text-gray-900">
                                    {item.syllables?.join("·") || item.expected}
                                  </div>
                                </div>
                                <div
                                  className={`p-2 rounded-lg ${
                                    item.correct
                                      ? "bg-green-50 border-2 border-green-200"
                                      : "bg-red-50 border-2 border-red-200"
                                  }`}
                                >
                                  <div className="text-xs text-gray-600 mb-1">
                                    You said
                                  </div>
                                  <div className="font-semibold text-gray-900">
                                    {item.syllables?.join("·") || item.spoken}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleTryAgain}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition-all"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Try Again
                    </button>
                    <button
                      onClick={handleNextSentence}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all"
                    >
                      Next Sentence
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Sentence List */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">
                  Practice Sentences
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sentences.map((sentence, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setResult(null);
                        setError(null);
                      }}
                      className={`
                      w-full text-left p-3 rounded-lg border-2 transition-all
                      ${
                        idx === currentIndex
                          ? "bg-primary/10 border-primary text-primary font-medium"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    >
                      <p className="text-sm">{sentence}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Session Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus Area:</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {focus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium text-gray-900">
                      {langCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attempts:</span>
                    <span className="font-medium text-gray-900">
                      {sessionData.attempts}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
