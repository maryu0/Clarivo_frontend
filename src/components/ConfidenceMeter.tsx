import React from 'react';
interface ConfidenceMeterProps {
  score: number; // 0-100
  size?: number;
  label?: string;
}
export function ConfidenceMeter({
  score,
  size = 120,
  label = 'Confidence'
}: ConfidenceMeterProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - score / 100 * circumference;
  const getColor = (val: number) => {
    if (val >= 80) return '#10B981'; // Green
    if (val >= 50) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };
  const color = getColor(score);
  return <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{
      width: size,
      height: size
    }}>
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="transparent" />
          {/* Progress Circle */}
          <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500 ease-out" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900 tabular-nums">
            {Math.round(score)}%
          </span>
        </div>
      </div>
      {label && <p className="mt-2 text-sm font-medium text-gray-500">{label}</p>}
    </div>;
}