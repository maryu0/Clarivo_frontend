import React, { useState } from 'react';
import { Search, Clock, ArrowRight, User, Calendar } from 'lucide-react';
import { patients, recentSessions } from '../utils/mockData';
import { Link, useNavigate } from 'react-router-dom';
export function SessionLauncher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const navigate = useNavigate();
  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleStartSession = () => {
    if (selectedPatient) {
      navigate('/record');
    }
  };
  return <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Start New Session
        </h1>
        <p className="text-gray-500">
          Select a patient to begin a clinical evaluation or therapy session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Selection Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select Patient
            </h2>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input type="text" placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {filteredPatients.map(patient => <div key={patient.id} onClick={() => setSelectedPatient(patient.id)} className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-between group ${selectedPatient === patient.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedPatient === patient.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {patient.condition} • {patient.age} years old
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Last: {patient.lastSession}
                    </div>
                    <div className={`text-xs font-medium ${patient.progress > 70 ? 'text-green-600' : 'text-amber-600'}`}>
                      {patient.progress}% Progress
                    </div>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Recent History for Selected Patient */}
          {selectedPatient && <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent History
              </h3>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">
                        Duration
                      </th>
                      <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">
                        Score
                      </th>
                      <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentSessions.filter(s => s.patientId === selectedPatient).map(session => <tr key={session.id}>
                          <td className="py-3 text-sm text-gray-900">
                            {session.date}
                          </td>
                          <td className="py-3 text-sm text-gray-500">
                            {session.duration}
                          </td>
                          <td className="py-3 text-sm">
                            <span className="font-medium text-gray-900">
                              {session.overallScore}%
                            </span>
                          </td>
                          <td className="py-3 text-right text-sm">
                            <Link to="/results" className="text-primary hover:underline">
                              View
                            </Link>
                          </td>
                        </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}
        </div>

        {/* Action Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Session Details
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm">Therapist</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Dr. Reynolds
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Date</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Est. Duration</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  45 mins
                </span>
              </div>
            </div>

            <button onClick={handleStartSession} disabled={!selectedPatient} className={`w-full py-4 px-6 rounded-xl flex items-center justify-center font-bold text-lg transition-all transform ${selectedPatient ? 'bg-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-1' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
              Start Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            {!selectedPatient && <p className="text-center text-sm text-gray-500 mt-4">
                Please select a patient to continue
              </p>}
          </div>
        </div>
      </div>
    </div>;
}