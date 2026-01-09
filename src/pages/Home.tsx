import React from "react";
import { TopBar } from "../components/TopBar";
import { LanguageCard } from "../components/LanguageCard";
import {
  Zap,
  TrendingUp,
  Calendar,
  Award,
  Heart,
  Sparkles,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary-dark">
              Clarivo
            </span>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors text-lg px-4 py-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col items-center">
        {/* Welcome Badge */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary-dark">
              Welcome back! Ready to practice today?
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6 tracking-tight leading-tight">
            Forge Your Voice Back
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
            Personalized speech therapy powered by AI.{" "}
            <br className="hidden md:block" />
            Select a language to begin your daily practice.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center hover:shadow-lg hover:scale-105 hover:border-primary/30 transition-all duration-300 cursor-pointer">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center transition-colors hover:bg-primary/20">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Day Streak
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center hover:shadow-lg hover:scale-105 hover:border-secondary/30 transition-all duration-300 cursor-pointer">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center transition-colors hover:bg-secondary/20">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Total Sessions
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center hover:shadow-lg hover:scale-105 hover:border-success/30 transition-all duration-300 cursor-pointer">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center transition-colors hover:bg-success/20">
                <Award className="w-6 h-6 text-success" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">82%</div>
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Best Score
            </div>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="w-full max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-shrink-0">
                <Heart className="w-8 h-8 text-secondary" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Today's Encouragement
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  "Every word you practice is a step forward. Your dedication is
                  building strength, one sound at a time."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="w-full max-w-6xl mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Language
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <LanguageCard
              code="US"
              flag="🇺🇸"
              title="English (US)"
              nativeTitle="English"
              phrase="Hello, how are you?"
              subtext="Standard American English"
              path="/practice?lang=en-US"
            />
            <LanguageCard
              code="IN"
              flag="🇮🇳"
              title="Hindi (India)"
              nativeTitle="हिंदी"
              phrase="नमस्ते, आप कैसे हैं?"
              subtext="Modern Hindi"
              path="/practice?lang=hi-IN"
            />
            <LanguageCard
              code="ES"
              flag="🇪🇸"
              title="Spanish (ES)"
              nativeTitle="Español"
              phrase="Hola, ¿cómo estás?"
              subtext="Castilian Spanish"
              path="/practice?lang=es-ES"
            />
          </div>
        </div>

        {/* Recent Activity Link */}
        <div className="mt-8 animate-in fade-in duration-700 delay-700">
          <Link
            to="/history"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors group"
          >
            <Calendar className="w-4 h-4" />
            <span>View your practice history</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
          <Zap className="w-4 h-4 text-blue-500" fill="currentColor" />
          <span className="text-sm font-medium">Powered by Azure AI</span>
        </div>
      </footer>
    </div>
  );
}
