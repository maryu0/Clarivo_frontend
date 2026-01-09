import React from "react";
import { TopBar } from "../components/TopBar";
import { TrendChart } from "../components/TrendChart";
import { wpmTrendData } from "../utils/mockData";
import {
  TrendingUp,
  Target,
  Volume2,
  Calendar,
  Play,
  Sparkles,
  Heart,
  Award,
  Gauge,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export function PatientDashboard() {
  const navigate = useNavigate();
  const recommendations = [
    {
      icon: Volume2,
      title: "Vowel Clarity",
      description: "Practice open vowel sounds to improve clarity",
      color: "bg-blue-50 text-blue-600",
      path: "/practice?lang=en-US&focus=vowels",
    },
    {
      icon: Target,
      title: "Fluency Pacing",
      description: "Work on consistent speaking rhythm",
      color: "bg-purple-50 text-purple-600",
      path: "/practice?lang=en-US&focus=fluency",
    },
  ];
  const recentSessions = [
    {
      id: 1,
      date: "Today, 10:30 AM",
      language: "Hindi",
      phrase: "नमस्ते, आप कैसे हैं?",
      score: 82,
    },
    {
      id: 2,
      date: "Yesterday, 4:15 PM",
      language: "Hindi",
      phrase: "मेरा नाम राहुल है",
      score: 76,
    },
    {
      id: 3,
      date: "Oct 24, 2:00 PM",
      language: "English",
      phrase: "Hello, how are you?",
      score: 90,
    },
    {
      id: 4,
      date: "Oct 23, 11:00 AM",
      language: "Spanish",
      phrase: "Hola, ¿cómo estás?",
      score: 85,
    },
  ];

  // Current metrics data
  const currentMetrics = {
    fluencyPacing: 78,
    vowelClarity: 82,
  };

  // Top 5 frequently fumbled words
  const fumbledWords = [
    { word: "rhythm", attempts: 12, errors: 8 },
    { word: "pronunciation", attempts: 15, errors: 9 },
    { word: "specifically", attempts: 10, errors: 6 },
    { word: "comfortable", attempts: 14, errors: 7 },
    { word: "literally", attempts: 8, errors: 5 },
  ];
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <TopBar
        variant="therapist"
        title="My Dashboard"
        rightAction={
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-dark">
                5 Day Streak
              </span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-red-400/50 hover:border-red-500"
            >
              Sign Out
            </button>
          </div>
        }
      />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        {/* Section 1: Reassurance & Summary */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-top duration-500">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Your pronunciation is improving
              </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-6">
              <div className="flex items-baseline gap-3">
                <div className="text-6xl md:text-7xl font-bold">78%</div>
                <div className="text-xl text-white/80">Overall Progress</div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="font-medium">Up from last week</span>
              </div>
            </div>

            <p className="mt-6 text-lg text-white/90 max-w-2xl">
              You've completed 18 practice sessions. Keep going—consistency
              matters more than perfection.
            </p>
          </div>
        </div>

        {/* Section 2: Speech Fluency Progress */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom duration-500 delay-150">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Speech Fluency Trend
            </h2>
            <p className="text-sm text-gray-600">
              Measured in words per minute during practice
            </p>
          </div>
          <div
            className="h-64 w-full"
            role="img"
            aria-label="Speech fluency trend chart showing words per minute over the last 7 practice sessions"
          >
            <TrendChart data={wpmTrendData} dataKey="wpm" />
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              Your speaking speed is becoming more natural with practice. You've
              progressed from{" "}
              <span className="font-semibold text-primary">72 WPM</span> to{" "}
              <span className="font-semibold text-primary">92 WPM</span> over
              your recent sessions.
            </p>
          </div>
        </div>

        {/* Section 3: Current Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
          {/* Card 1: Fluency & Vowel Metrics */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Gauge className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">
                Your Current Metrics
              </h2>
            </div>
            <div
              className="space-y-5"
              role="region"
              aria-label="Speech metrics"
            >
              {/* Fluency Pacing */}
              <div className="group space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                      Fluency Pacing
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Consistent speaking rhythm and pace
                    </p>
                  </div>
                  <div
                    className="relative flex items-baseline justify-center min-w-[110px] px-5 py-3 bg-white rounded-2xl shadow-md border-2 border-purple-100 group-hover:border-purple-300 group-hover:shadow-lg transition-all duration-300 hover:scale-105"
                    aria-label={`Fluency pacing score: ${currentMetrics.fluencyPacing} out of 100`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl opacity-60" />
                    <span className="relative text-5xl font-bold text-purple-700 tracking-tight">
                      {currentMetrics.fluencyPacing}
                    </span>
                    <span className="relative text-lg text-purple-600/80 ml-1 font-semibold">
                      /100
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner">
                  <div
                    className="absolute inset-0 h-full rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 shadow-sm transition-all duration-1000 ease-out"
                    style={{ width: `${currentMetrics.fluencyPacing}%` }}
                    role="progressbar"
                    aria-valuenow={currentMetrics.fluencyPacing}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Vowel Clarity */}
              <div className="group space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                      Vowel Clarity
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Open vowel sound pronunciation
                    </p>
                  </div>
                  <div
                    className="relative flex items-baseline justify-center min-w-[110px] px-5 py-3 bg-white rounded-2xl shadow-md border-2 border-blue-100 group-hover:border-blue-300 group-hover:shadow-lg transition-all duration-300 hover:scale-105"
                    aria-label={`Vowel clarity score: ${currentMetrics.vowelClarity} out of 100`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl opacity-60" />
                    <span className="relative text-5xl font-bold text-blue-700 tracking-tight">
                      {currentMetrics.vowelClarity}
                    </span>
                    <span className="relative text-lg text-blue-600/80 ml-1 font-semibold">
                      /100
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner">
                  <div
                    className="absolute inset-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-sm transition-all duration-1000 ease-out"
                    style={{ width: `${currentMetrics.vowelClarity}%` }}
                    role="progressbar"
                    aria-valuenow={currentMetrics.vowelClarity}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Top 5 Frequently Fumbled Words */}
          <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200/60 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-200/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 shadow-md">
                <AlertCircle className="w-4.5 h-4.5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Words to Focus On
              </h2>
            </div>
            <p className="text-xs text-gray-500 mb-4 font-medium">
              Your top 5 frequently fumbled words from recent sessions
            </p>
            <ul
              className="space-y-2"
              role="list"
              aria-label="Top 5 frequently fumbled words"
            >
              {fumbledWords.map((item, index) => (
                <li
                  key={item.word}
                  className="group flex items-center justify-between animate-in fade-in slide-in-from-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-xl p-2 -mx-2 transition-all duration-300 border border-transparent hover:border-gray-200/40"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "500ms",
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex items-center gap-2.5 flex-1">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-white font-bold text-xs shadow-sm ring-2 ring-slate-200">
                      {index + 1}
                    </span>
                    <span
                      className="px-3 py-1.5 bg-gradient-to-br from-rose-50 via-white to-rose-50/50 text-rose-900 rounded-lg border border-rose-200/70 font-semibold text-sm shadow-sm group-hover:border-rose-300 group-hover:shadow transition-all duration-300"
                      role="text"
                      aria-label={`Word: ${item.word}, ${item.errors} errors out of ${item.attempts} attempts`}
                    >
                      {item.word}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex flex-col items-center justify-center min-w-[70px] px-4 py-2 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border border-rose-200/60 group-hover:border-rose-300/80 group-hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/60 to-transparent rounded-lg opacity-40" />
                      <span className="relative text-2xl font-bold bg-gradient-to-br from-rose-600 to-rose-700 bg-clip-text text-transparent leading-none">
                        {item.errors}
                      </span>
                      <span className="relative text-[10px] text-gray-600 font-semibold mt-1 tracking-wide uppercase">
                        of {item.attempts}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-gray-200/50">
              <div className="flex items-start gap-2.5 p-2.5 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 rounded-lg border border-slate-200/60 shadow-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm">
                  <span className="text-sm text-white">💡</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed flex-1 font-medium">
                  <span className="font-bold text-slate-900">Pro Tip:</span>{" "}
                  Focus on these words during your next practice session to see
                  measurable improvement in your overall fluency score.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: What to Practice Next */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What to Practice Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <button
                key={index}
                onClick={() => navigate(rec.path)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all text-left group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${rec.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <rec.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 mb-4">{rec.description}</p>
                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Practice now</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 5: Session History */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Practice Sessions
            </h2>
            <button
              onClick={() => navigate("/history")}
              className="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-500">
                        {session.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-sm font-medium text-primary">
                        {session.language}
                      </span>
                    </div>
                    <p className="text-base font-medium text-gray-900 truncate">
                      {session.phrase}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div
                      className={`
                      flex flex-col items-center justify-center w-16 h-16 rounded-xl
                      ${
                        session.score >= 80
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }
                    `}
                    >
                      <span className="text-xl font-bold">
                        {session.score}%
                      </span>
                    </div>

                    <button
                      className="p-3 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Play audio"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Gentle Motivation */}
        <div className="bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 rounded-2xl p-6 md:p-8 border border-red-200/30 animate-in fade-in slide-in-from-bottom duration-500 delay-700">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                You're doing great! 👏
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Remember, consistency matters more than perfection. Every
                practice session brings you closer to your goals.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
