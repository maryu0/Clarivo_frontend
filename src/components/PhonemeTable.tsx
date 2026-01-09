import React from 'react';
import { PhonemeData } from '../types/clinical';
import { ArrowUpDown, AlertCircle, CheckCircle } from 'lucide-react';
interface PhonemeTableProps {
  data: PhonemeData[];
}
export function PhonemeTable({
  data
}: PhonemeTableProps) {
  return <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              <div className="flex items-center">
                Phoneme
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Accuracy
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Occurrences
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {row.phoneme}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500">{row.category}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div className={`h-2 rounded-full ${row.accuracy >= 80 ? 'bg-green-500' : row.accuracy >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                  width: `${row.accuracy}%`
                }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 tabular-nums">
                    {row.accuracy}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 tabular-nums">
                {row.count}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {row.accuracy >= 80 ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Mastered
                  </span> : row.accuracy >= 60 ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Developing
                  </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Needs Focus
                  </span>}
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
}