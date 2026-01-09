import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
interface TopBarProps {
  showBack?: boolean;
  title?: string;
  rightAction?: React.ReactNode;
  variant?: 'home' | 'app' | 'therapist';
}
export function TopBar({
  showBack,
  title,
  rightAction,
  variant = 'app'
}: TopBarProps) {
  const navigate = useNavigate();
  if (variant === 'home') {
    return <header className="w-full bg-white border-b border-gray-100 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <Link to="/therapist-login" className="text-primary font-medium hover:text-primary-dark transition-colors text-lg px-4 py-2">
            Therapist Login
          </Link>
        </div>
      </header>;
  }
  if (variant === 'therapist') {
    return <header className="w-full bg-white border-b border-gray-100 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo />
            {title && <>
                <div className="h-6 w-px bg-gray-200" />
                <h1 className="text-xl font-semibold text-gray-700">{title}</h1>
              </>}
          </div>
          {rightAction}
        </div>
      </header>;
  }
  return <header className="w-full bg-white border-b border-gray-100 px-4 py-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {showBack && <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors" aria-label="Go back">
              <ArrowLeft className="w-8 h-8" />
            </button>}
          {title && <span className="bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium border border-primary/20">
              {title}
            </span>}
        </div>

        {rightAction || <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600" aria-label="Settings">
            <Settings className="w-8 h-8" />
          </button>}
      </div>
    </header>;
}