import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Practice } from './pages/Practice';
import { Results } from './pages/Results';
import { History } from './pages/History';
import { PatientLogin } from './pages/TherapistLogin';
import { PatientDashboard } from './pages/PatientDashboard';
import { TherapistDashboard } from './pages/TherapistDashboard';
import { SessionDetail } from './pages/SessionDetail';
export function App() {
  return <Router>
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<PatientLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />

        {/* Therapist Routes */}
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
        <Route path="/session/:id" element={<SessionDetail />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>;
}