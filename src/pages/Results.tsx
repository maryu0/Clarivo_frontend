import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { ScoreCircle } from '../components/ScoreCircle';
import { MetricCard } from '../components/MetricCard';
import { PhonemeChip } from '../components/PhonemeChip';
import { Play, RotateCcw, ArrowRight, Volume2 } from 'lucide-react';
export function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const langCode = searchParams.get('lang') || 'en-US';
  // Mock data based on language
  const isHindi = langCode === 'hi-IN';
  const phonemes = isHindi ? [{
    char: 'न',
    status: 'good' as const
  }, {
    char: 'म',
    status: 'average' as const
  }, {
    char: 'स्ते',
    status: 'good' as const
  }] : [{
    char: 'He',
    status: 'good' as const
  }, {
    char: 'llo',
    status: 'good' as const
  }, {
    char: 'How',
    status: 'average' as const
  }];
  return <div className="min-h-screen bg-background flex flex-col">
      <TopBar showBack title={isHindi ? 'Hindi (IN)' : 'English (US)'} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Your Results
        </h2>

        {/* Score Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <ScoreCircle score={82} />

          <div className="flex flex-col gap-4 w-full md:w-64">
            <MetricCard label="Accuracy" value={82} />
            <MetricCard label="Fluency" value={78} />
            <MetricCard label="Prosody" value={85} />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Sound-by-sound feedback
          </h3>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
            {phonemes.map((p, i) => <PhonemeChip key={i} phoneme={p.char} status={p.status} />)}
          </div>

          <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
            You did well on most sounds. Let's focus on the{' '}
            <span className="font-bold text-primary">'{phonemes[1].char}'</span>{' '}
            sound next time.
          </p>
        </div>

        {/* Audio Playback */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Hear the correct pronunciation
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary/10 text-primary-dark rounded-xl font-bold hover:bg-primary/20 transition-colors">
              <Volume2 className="w-6 h-6" />
              Play slowly (0.75x)
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              <Play className="w-5 h-5" />
              Normal speed
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:static md:bg-transparent md:border-0 md:p-0">
          <div className="max-w-3xl mx-auto flex gap-4">
            <button onClick={() => navigate(-1)} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              <RotateCcw className="w-5 h-5" />
              Practice again
            </button>
            <button onClick={() => navigate('/')} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-colors">
              Next phrase
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>;
}