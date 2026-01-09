import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Practice } from "./pages/Practice";
import { Results } from "./pages/Results";
import { History } from "./pages/History";
import { Login } from "./pages/Login";
import { PatientLogin } from "./pages/TherapistLogin";
import { PatientDashboard } from "./pages/PatientDashboard";
import { TherapistDashboard } from "./pages/TherapistDashboard";
import { SessionDetail } from "./pages/SessionDetail";
import { UserSetup } from "./pages/UserSetup";
import { UserProvider } from "./context/UserContext";

export function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/setup" element={<UserSetup />} />
          <Route path="/login" element={<Login />} />

          {/* Patient Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/therapist-login" element={<PatientLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />

          {/* Therapist Routes */}
          <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
          <Route path="/session/:id" element={<SessionDetail />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
