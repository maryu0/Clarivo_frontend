import React from 'react';
import { Activity, Hammer } from 'lucide-react';
interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}
export function Logo({
  className = '',
  variant = 'dark'
}: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-primary-dark';
  return <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-sm">
        <Hammer className="w-5 h-5 text-white absolute transform -translate-x-1" />
        <Activity className="w-4 h-4 text-secondary absolute transform translate-x-2 translate-y-2" />
      </div>
      <span className={`text-xl font-bold tracking-tight ${textColor}`}>
        Clarivo
      </span>
    </div>;
}