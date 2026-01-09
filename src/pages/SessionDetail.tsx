import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { MetricCard } from '../components/MetricCard';
import { PhonemeChip } from '../components/PhonemeChip';
import { ArrowLeft, Play, Volume2, Calendar, Clock, User } from 'lucide-react';
export function SessionDetail() {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  // Mock session data
  const session = {
    id: id || '101',
    date: 'October 26, 2024',
    time: '10:30 AM',
    patient: 'Rahul Sharma',
    language: 'Hindi (India)',
    phrase: 'नमस्ते, आप कैसे हैं?',
    transliteration: 'Namaste, aap kaise hain?',
    duration: '2m 15s',
    accuracy: 82,
    fluency: 78,
    prosody: 85,
    phonemes: [{
      char: 'न',
      status: 'good' as const,
      score: 95
    }, {
      char: 'म',
      status: 'average' as const,
      score: 68
    }, {
      char: 'स्ते',
      status: 'good' as const,
      score: 88
    }],
    notes: 'Patient showed significant improvement in pronunciation of nasal sounds. The म sound still needs work - recommend focused practice on bilabial nasals. Overall progress is encouraging, with consistent practice leading to measurable gains in fluency and confidence.'
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar variant="therapist" title="Session Details" rightAction={<button onClick={() => navigate('/therapist-dashboard')} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back to Dashboard</span>
          </button>} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Session Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Session #{session.id}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-gray-700">
                    {session.patient}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{session.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-primary/10 text-primary-dark rounded-full text-sm font-medium border border-primary/20">
                {session.language}
              </span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                {session.duration}
              </span>
            </div>
          </div>

          {/* Phrase Display */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
            <label className="text-xs uppercase tracking-wide font-bold text-primary-dark mb-3 block">
              Practice Phrase
            </label>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {session.phrase}
            </p>
            <p className="text-lg text-gray-600 italic">
              {session.transliteration}
            </p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard label="Accuracy" value={session.accuracy} />
            <MetricCard label="Fluency" value={session.fluency} />
            <MetricCard label="Prosody" value={session.prosody} />
          </div>
        </div>

        {/* Phoneme Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Phoneme Breakdown
          </h2>
          <div className="flex flex-wrap gap-6 mb-6">
            {session.phonemes.map((p, i) => <div key={i} className="flex flex-col items-center">
                <PhonemeChip phoneme={p.char} status={p.status} />
                <span className="text-xs text-gray-500 mt-2 font-medium">
                  {p.score}%
                </span>
              </div>)}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-primary-dark">Analysis:</span>{' '}
              Strong performance on most phonemes. The{' '}
              <span className="font-bold">'{session.phonemes[1].char}'</span>{' '}
              sound requires additional attention and targeted practice
              exercises.
            </p>
          </div>
        </div>

        {/* Audio Playback */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Audio Recording
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
              <Play className="w-5 h-5" />
              Play Patient Recording
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              <Volume2 className="w-5 h-5" />
              Play Reference Audio
            </button>
          </div>
        </div>

        {/* Clinical Notes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Clinical Notes
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {session.notes}
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              Edit Notes
            </button>
          </div>
        </div>
      </main>
    </div>;
}