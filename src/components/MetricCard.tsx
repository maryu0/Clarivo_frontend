import React from 'react';
interface MetricCardProps {
  label: string;
  value: number;
  total?: number;
}
export function MetricCard({
  label,
  value,
  total = 100
}: MetricCardProps) {
  const percentage = Math.round(value / total * 100);
  let colorClass = 'bg-success';
  if (percentage < 50) colorClass = 'bg-error';else if (percentage < 80) colorClass = 'bg-warning';
  return <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <span className="text-gray-500 font-medium text-sm uppercase tracking-wide">
          {label}
        </span>
        <span className="text-xl font-bold text-gray-900">
          {value}/{total}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass} transition-all duration-1000`} style={{
        width: `${percentage}%`
      }} />
      </div>
    </div>;
}