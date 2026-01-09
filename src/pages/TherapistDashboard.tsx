import React from 'react';
import { TopBar } from '../components/TopBar';
import { Users, LogOut, Download, Play, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TrendChart } from '../components/TrendChart';
import { trendData } from '../utils/mockData';
export function TherapistDashboard() {
  const navigate = useNavigate();
  const patients = [{
    id: 1,
    name: 'Rahul Sharma',
    lang: 'Hindi',
    lastSession: 'Today',
    accuracy: 76
  }, {
    id: 2,
    name: 'Ana Garcia',
    lang: 'Spanish',
    lastSession: 'Yesterday',
    accuracy: 82
  }, {
    id: 3,
    name: 'John Smith',
    lang: 'English',
    lastSession: 'Oct 24',
    accuracy: 65
  }];
  const sessions = [{
    id: 101,
    date: 'Oct 26, 10:30 AM',
    patient: 'Rahul Sharma',
    phrase: 'नमस्ते, आप कैसे हैं?',
    score: 82
  }, {
    id: 102,
    date: 'Oct 25, 2:15 PM',
    patient: 'Rahul Sharma',
    phrase: 'मेरा नाम...',
    score: 74
  }, {
    id: 103,
    date: 'Oct 25, 11:00 AM',
    patient: 'Ana Garcia',
    phrase: 'Hola, ¿cómo estás?',
    score: 88
  }, {
    id: 104,
    date: 'Oct 24, 4:30 PM',
    patient: 'John Smith',
    phrase: 'Hello, how are...',
    score: 62
  }];
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar variant="therapist" title="Therapist Dashboard" rightAction={<div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                MS
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                Dr. Meera Singh
              </span>
            </div>
            <button onClick={() => navigate('/')} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Patient Selector & Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Select Patient
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white">
                  {patients.map(p => <option key={p.id} value={p.id}>
                      {p.name} ({p.lang})
                    </option>)}
                </select>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Patient Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Current Patient</span>
                  <span className="font-medium text-gray-900">
                    Rahul Sharma
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Language</span>
                  <span className="font-medium text-gray-900">Hindi (IN)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Avg. Accuracy (Week)</span>
                  <span className="font-bold text-primary">76%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Sessions this week</span>
                  <span className="font-medium text-gray-900">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Charts & Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Accuracy Over Time
                </h3>
                <span className="text-sm text-gray-500">Last 7 sessions</span>
              </div>
              <div className="h-64 w-full">
                <TrendChart data={trendData} />
              </div>
            </div>

            {/* Recent Sessions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Sessions
                </h3>
                <button className="text-primary text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Patient</th>
                      <th className="px-6 py-3">Phrase</th>
                      <th className="px-6 py-3">Score</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sessions.map(session => <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {session.date}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {session.patient}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[150px]">
                          {session.phrase}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${session.score >= 80 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {session.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Play audio">
                              <Play className="w-4 h-4" />
                            </button>
                            <button onClick={() => navigate(`/session/${session.id}`)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View details">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary-dark transition-colors">
                <Download className="w-4 h-4" />
                Download Progress Report (PDF)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>;
}