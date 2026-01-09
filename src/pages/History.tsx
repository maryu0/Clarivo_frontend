import React from 'react';
import { TopBar } from '../components/TopBar';
import { Calendar, Clock } from 'lucide-react';
export function History() {
  const history = [{
    id: 1,
    date: 'Today, 10:30 AM',
    lang: 'Hindi',
    phrase: 'नमस्ते, आप कैसे हैं?',
    score: 82
  }, {
    id: 2,
    date: 'Yesterday, 4:15 PM',
    lang: 'Hindi',
    phrase: 'मेरा नाम राहुल है',
    score: 76
  }, {
    id: 3,
    date: 'Oct 24, 2:00 PM',
    lang: 'English',
    phrase: 'Hello, how are you?',
    score: 90
  }];
  return <div className="min-h-screen bg-background flex flex-col">
      <TopBar showBack title="History" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Your Recent Practice
        </h2>

        <div className="space-y-4">
          {history.map(item => <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="font-medium text-primary">{item.lang}</span>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {item.phrase}
                </p>
              </div>

              <div className={`
                flex flex-col items-center justify-center w-16 h-16 rounded-full
                ${item.score >= 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
              `}>
                <span className="text-xl font-bold">{item.score}%</span>
              </div>
            </div>)}
        </div>
      </main>
    </div>;
}