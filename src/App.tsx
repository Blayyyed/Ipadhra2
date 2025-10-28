// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// Public pages
import Welcome from "./pages/Welcome";
import Acknowledge1 from "./pages/Acknowledge1";  // using your filename
import Home from "./pages/Home";                  // area-selection list
import MapSelect from "./pages/MapSelect";
import Finalize from "./pages/Finalize";
import Thanks from "./pages/Thanks";

// Admin / auth
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";
import { useAuth } from "./auth/AuthContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <AccessDenied />;
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-slate-100 min-h-screen">
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="font-semibold">HRA Kiosk</h1>
            <nav className="text-sm flex gap-4">
              <Link to="/" className="text-blue-600">
                Home
              </Link>
              <Link to="/admin" className="text-blue-600">
                Admin
              </Link>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            {/* New flow */}
            <Route path="/" element={<Welcome />} />
            <Route path="/acknowledge" element={<Acknowledge1 />} />

            {/* Area-selection list */}
            <Route path="/areas" element={<Home />} />

            {/* Main flow */}
            <Route path="/map/:areaId" element={<MapSelect />} />
            <Route path="/final/:areaId" element={<Finalize />} />
            <Route path="/thanks" element={<Thanks />} />

            {/* Admin */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/access-denied" element={<AccessDenied />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
