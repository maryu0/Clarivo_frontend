import React from 'react';
import { Users, Activity, Calendar, TrendingUp, Filter, Download, Plus } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { TrendChart } from '../components/TrendChart';
import { ComparisonChart } from '../components/ComparisonChart';
import { trendData, comparisonData, recentSessions } from '../utils/mockData';
import { Link } from 'react-router-dom';
export function Dashboard() {
  return <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Therapist Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back, Dr. Reynolds. Here's your clinical overview.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <Link to="/launcher" className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium shadow-sm transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value="24" trend={12} icon={Users} color="blue" />
        <StatCard title="Avg. Accuracy" value="78%" trend={5.4} icon={Activity} color="green" />
        <StatCard title="Sessions This Week" value="18" trend={-2} icon={Calendar} color="amber" />
        <StatCard title="Improvement Rate" value="+15%" trend={3.2} icon={TrendingUp} color="purple" />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Analysis - Takes up 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Patient Progress Trends
              </h2>
              <p className="text-sm text-gray-500">
                Average accuracy scores over the last 30 days
              </p>
            </div>
            <div className="flex space-x-2">
              <select className="text-sm border-gray-300 border rounded-md px-3 py-1.5 focus:ring-primary focus:border-primary">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Year to Date</option>
              </select>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
          <TrendChart data={trendData} />
        </div>

        {/* Comparison Chart - Takes up 1 column */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Benchmark Analysis
            </h2>
            <p className="text-sm text-gray-500">Patient vs. Native Speaker</p>
          </div>
          <ComparisonChart data={comparisonData} />
        </div>
      </div>

      {/* Recent Sessions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Sessions</h2>
          <Link to="/results" className="text-sm font-medium text-primary hover:text-primary-dark">
            View All History
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSessions.map(session => <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mr-3">
                        {session.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {session.patientName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${session.overallScore >= 80 ? 'bg-green-100 text-green-800' : session.overallScore >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                      {session.overallScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                    {session.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to="/results" className="text-primary hover:text-primary-dark">
                      View Results
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}