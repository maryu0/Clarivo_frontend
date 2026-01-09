import React from 'react';
interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'lg';
}
export function ScoreCircle({
  score,
  size = 'lg'
}: ScoreCircleProps) {
  // Determine color based on score
  let colorClass = 'text-success border-success';
  let bgClass = 'bg-success/10';
  if (score < 50) {
    colorClass = 'text-error border-error';
    bgClass = 'bg-error/10';
  } else if (score < 80) {
    colorClass = 'text-warning border-warning';
    bgClass = 'bg-warning/10';
  }
  const dimension = size === 'lg' ? 'w-48 h-48' : 'w-16 h-16';
  const textSize = size === 'lg' ? 'text-5xl' : 'text-sm';
  const labelSize = size === 'lg' ? 'text-lg' : 'text-[10px]';
  const strokeWidth = size === 'lg' ? 8 : 4;
  const radius = size === 'lg' ? 80 : 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - score / 100 * circumference;
  return <div className={`relative flex flex-col items-center justify-center rounded-full ${dimension} ${bgClass}`}>
      {/* SVG for progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
        <circle className="text-gray-200" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx="50%" cy="50%" />
        <circle className={`transition-all duration-1000 ease-out ${colorClass.split(' ')[0]}`} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="50%" cy="50%" />
      </svg>

      <div className="flex flex-col items-center relative z-10">
        <span className={`font-bold ${textSize} text-gray-900`}>{score}%</span>
        {size === 'lg' && <span className={`font-medium text-gray-500 ${labelSize} mt-1`}>
            Accuracy
          </span>}
      </div>
    </div>;
}