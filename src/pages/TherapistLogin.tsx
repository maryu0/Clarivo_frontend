import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Lock, Mail, ArrowRight } from 'lucide-react';
export function PatientLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/patient-dashboard');
    }, 1000);
  };
  return <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <div className="flex justify-center mb-8">
          <Logo className="scale-125" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign in to continue your speech therapy journey
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input type="email" defaultValue="patient@clarivo.com" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input type="password" defaultValue="password123" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 text-lg">
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700 text-center">
          <strong>Demo Account:</strong> Use the credentials above to explore
          your dashboard
        </div>

        <button onClick={() => navigate('/')} className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 underline">
          Back to Home
        </button>
      </div>
    </div>;
}