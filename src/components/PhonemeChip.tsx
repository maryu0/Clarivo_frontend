import React from 'react';
interface PhonemeChipProps {
  phoneme: string;
  status: 'good' | 'average' | 'poor';
}
export function PhonemeChip({
  phoneme,
  status
}: PhonemeChipProps) {
  const styles = {
    good: 'bg-success/10 text-success-dark border-success/20',
    average: 'bg-warning/10 text-warning-dark border-warning/20',
    poor: 'bg-error/10 text-error-dark border-error/20'
  };
  const labels = {
    good: 'Good',
    average: 'Okay',
    poor: 'Needs work'
  };
  // Map status to color for the dot
  const dotColor = {
    good: 'bg-success',
    average: 'bg-warning',
    poor: 'bg-error'
  };
  return <div className="flex flex-col items-center gap-2">
      <div className={`
        flex items-center justify-center w-16 h-16 rounded-xl border-2 text-2xl font-bold
        ${styles[status]}
      `}>
        {phoneme}
      </div>
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${dotColor[status]}`} />
        <span className="text-sm font-medium text-gray-600">
          {labels[status]}
        </span>
      </div>
    </div>;
}