import React from 'react';
import { Download, Share2, ArrowLeft, FileText } from 'lucide-react';
import { PhonemeTable } from '../components/PhonemeTable';
import { ComparisonChart } from '../components/ComparisonChart';
import { phonemeBreakdown, comparisonData } from '../utils/mockData';
import { Link } from 'react-router-dom';
export function ResultsPage() {
  return <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6 text-gray-500" />
          </Link>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Session Analysis
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            </div>
            <p className="text-gray-500">
              Emma Thompson • Oct 24, 2023 • 45 mins
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium shadow-sm transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Overall Accuracy
          </h3>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold text-gray-900">82%</span>
            <span className="text-sm font-medium text-green-600 mb-1">
              +5% vs last
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full" style={{
            width: '82%'
          }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Fluency Score
          </h3>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold text-gray-900">76%</span>
            <span className="text-sm font-medium text-amber-600 mb-1">
              Steady
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div className="bg-amber-500 h-2 rounded-full" style={{
            width: '76%'
          }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Intelligibility
          </h3>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold text-gray-900">90%</span>
            <span className="text-sm font-medium text-green-600 mb-1">
              High
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div className="bg-green-500 h-2 rounded-full" style={{
            width: '90%'
          }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phoneme Breakdown Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">
              Phoneme Breakdown
            </h2>
            <button className="text-sm text-primary font-medium hover:underline">
              View Full Report
            </button>
          </div>
          <PhonemeTable data={phonemeBreakdown} />
        </div>

        {/* Spectrogram / Visual Analysis Placeholder */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Benchmark Comparison
            </h2>
            <ComparisonChart data={comparisonData} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Session Notes
            </h2>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mb-4">
              <FileText className="h-4 w-4 inline-block mr-2 mb-0.5" />
              Focus on /r/ initial position showed significant improvement.
            </div>
            <textarea className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary resize-none" placeholder="Add additional clinical notes here..." defaultValue="Patient showed good motivation today. Fatigue set in around the 35-minute mark, affecting fluency slightly. Recommend shorter, more frequent sessions for next week." />
            <button className="mt-3 w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>;
}