import React from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface LanguageCardProps {
  code: string;
  flag: string;
  title: string;
  nativeTitle: string;
  phrase: string;
  subtext: string;
  path: string;
}
export function LanguageCard({
  code,
  flag,
  title,
  nativeTitle,
  phrase,
  subtext,
  path
}: LanguageCardProps) {
  const navigate = useNavigate();
  return <button onClick={() => navigate(path)} className="group relative flex flex-col items-start text-left w-full bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg hover:ring-2 hover:ring-primary transition-all duration-200 border border-gray-100" aria-label={`Select ${title}`}>
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl" role="img" aria-label={`${title} flag`}>
            {flag}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-bold tracking-wide">
            {code}
          </span>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <ArrowRight className="w-6 h-6" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-lg text-gray-500 mb-6 font-medium">{nativeTitle}</p>

      <div className="w-full bg-background p-4 rounded-lg border border-gray-100 mb-4 group-hover:border-primary/20 transition-colors">
        <p className="text-xl text-gray-800 font-medium italic">"{phrase}"</p>
      </div>

      <p className="text-sm text-gray-400 font-medium mt-auto">{subtext}</p>
    </button>;
}