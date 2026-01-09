import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { ArrowRight, SkipForward } from 'lucide-react';
// Mock data for different languages
const PHRASES = {
  'en-US': {
    text: 'Hello, how are you?',
    transliteration: 'Standard Greeting',
    langName: 'English (US)'
  },
  'hi-IN': {
    text: 'नमस्ते, आप कैसे हैं?',
    transliteration: 'Namaste, aap kaise hain?',
    langName: 'Hindi (IN)'
  },
  'es-ES': {
    text: 'Hola, ¿cómo estás?',
    transliteration: 'Ola, komo estas?',
    langName: 'Spanish (ES)'
  }
};
export function Practice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const langCode = searchParams.get('lang') || 'en-US';
  const currentPhrase = PHRASES[langCode as keyof typeof PHRASES] || PHRASES['en-US'];
  const [status, setStatus] = useState<'idle' | 'recording' | 'analyzing'>('idle');
  const [hasRecorded, setHasRecorded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  // Handle recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'recording' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (status === 'recording' && timeLeft === 0) {
      handleStopRecording();
    }
    return () => clearInterval(interval);
  }, [status, timeLeft]);
  const handleStartRecording = () => {
    setStatus('recording');
    setTimeLeft(5);
  };
  const handleStopRecording = () => {
    setStatus('analyzing');
    // Simulate analysis
    setTimeout(() => {
      setStatus('idle');
      setHasRecorded(true);
    }, 2000);
  };
  const handleAnalyze = () => {
    navigate(`/results?lang=${langCode}`);
  };
  return <div className="min-h-screen bg-background flex flex-col">
      <TopBar showBack title={currentPhrase.langName} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col items-center justify-between">
        {/* Top Section: Instructions & Phrase */}
        <div className="w-full text-center space-y-8">
          <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
            Step 1 of 2 – Speak the phrase
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              {currentPhrase.text}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium">
              {currentPhrase.transliteration}
            </p>
          </div>
        </div>

        {/* Middle Section: Microphone & Status */}
        <div className="flex flex-col items-center gap-8 my-8">
          <MicrophoneButton status={status} onClick={status === 'idle' ? handleStartRecording : handleStopRecording} />

          <div className="h-8 text-center">
            {status === 'idle' && !hasRecorded && <p className="text-lg text-gray-600 animate-in fade-in">
                Tap the microphone and say this phrase.
              </p>}
            {status === 'recording' && <p className="text-lg text-red-600 font-medium animate-pulse">
                Listening... {timeLeft} seconds remaining.
              </p>}
            {status === 'analyzing' && <p className="text-lg text-primary font-medium animate-pulse">
                Analyzing your speech with Azure AI...
              </p>}
            {status === 'idle' && hasRecorded && <p className="text-lg text-success font-medium flex items-center gap-2">
                <span>✓</span> Recording complete. Ready to analyze.
              </p>}
          </div>
        </div>

        {/* Bottom Section: Actions */}
        <div className="w-full flex items-center justify-between gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 px-6 py-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium text-lg">
            <SkipForward className="w-5 h-5" />
            Skip phrase
          </button>

          <button onClick={handleAnalyze} disabled={!hasRecorded} className={`
              flex-1 max-w-xs flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-all
              ${hasRecorded ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-xl hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}>
            Analyze
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-400 font-medium">
          Attempt 1 of 5
        </div>
      </main>
    </div>;
}