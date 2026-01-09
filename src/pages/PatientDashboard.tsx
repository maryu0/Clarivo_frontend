import React from 'react';
import { TopBar } from '../components/TopBar';
import { TrendChart } from '../components/TrendChart';
import { trendData } from '../utils/mockData';
import { TrendingUp, Target, Volume2, Calendar, Play, Sparkles, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function PatientDashboard() {
  const navigate = useNavigate();
  const recommendations = [{
    icon: Volume2,
    title: 'Vowel Clarity',
    description: 'Practice open vowel sounds to improve clarity',
    color: 'bg-blue-50 text-blue-600',
    path: '/practice?lang=en-US&focus=vowels'
  }, {
    icon: Target,
    title: 'Fluency Pacing',
    description: 'Work on consistent speaking rhythm',
    color: 'bg-purple-50 text-purple-600',
    path: '/practice?lang=en-US&focus=fluency'
  }];
  const recentSessions = [{
    id: 1,
    date: 'Today, 10:30 AM',
    language: 'Hindi',
    phrase: 'नमस्ते, आप कैसे हैं?',
    score: 82
  }, {
    id: 2,
    date: 'Yesterday, 4:15 PM',
    language: 'Hindi',
    phrase: 'मेरा नाम राहुल है',
    score: 76
  }, {
    id: 3,
    date: 'Oct 24, 2:00 PM',
    language: 'English',
    phrase: 'Hello, how are you?',
    score: 90
  }, {
    id: 4,
    date: 'Oct 23, 11:00 AM',
    language: 'Spanish',
    phrase: 'Hola, ¿cómo estás?',
    score: 85
  }];
  return <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <TopBar variant="therapist" title="My Dashboard" rightAction={<div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-dark">
                5 Day Streak
              </span>
            </div>
            <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Sign Out
            </button>
          </div>} />

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

        {/* Section 2: Progress Over Time */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom duration-500 delay-150">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Pronunciation Trend
          </h2>
          <div className="h-64 w-full">
            <TrendChart data={trendData} />
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Your last 7 practice sessions show steady improvement
          </p>
        </div>

        {/* Section 3: What to Practice Next */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What to Practice Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => <button key={index} onClick={() => navigate(rec.path)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all text-left group">
                <div className={`w-14 h-14 rounded-xl ${rec.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
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
              </button>)}
          </div>
        </div>

        {/* Section 4: Session History */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Practice Sessions
            </h2>
            <button onClick={() => navigate('/history')} className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentSessions.map(session => <div key={session.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
                    <div className={`
                      flex flex-col items-center justify-center w-16 h-16 rounded-xl
                      ${session.score >= 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
                    `}>
                      <span className="text-xl font-bold">
                        {session.score}%
                      </span>
                    </div>

                    <button className="p-3 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Play audio">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Section 5: Gentle Motivation */}
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-6 md:p-8 border border-secondary/20 animate-in fade-in slide-in-from-bottom duration-500 delay-700">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Heart className="w-8 h-8 text-secondary" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                You're doing great! 👏
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                You practiced{' '}
                <span className="font-bold text-primary">
                  3 times this week
                </span>
                . Remember, consistency matters more than perfection. Every
                practice session brings you closer to your goals.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>;
}