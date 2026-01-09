import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ElementType;
  color?: 'blue' | 'green' | 'amber' | 'purple';
}
export function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  color = 'blue'
}: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };
  return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 tabular-nums">
            {value}
          </h3>
        </div>
        {Icon && <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>}
      </div>

      {trend !== undefined && <div className="flex items-center text-sm">
          {trend > 0 ? <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" /> : trend < 0 ? <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" /> : <Minus className="h-4 w-4 text-gray-400 mr-1" />}
          <span className={`font-medium ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'}`}>
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-400 ml-1.5">
            {trendLabel || 'vs last month'}
          </span>
        </div>}
    </div>;
}