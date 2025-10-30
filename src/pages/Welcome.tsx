import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Welcome to the HRA Kiosk</h1>
        <div className="k-card space-y-4">
          <p className="text-slate-700">
            This kiosk guides your team through <strong>High Radiation Area (HRA)</strong> entry in a clear, repeatable way. 
            It standardizes the steps before your HRA brief so you can focus on the critical details.
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2">
            <li>Prepare your team for the HRA brief</li>
            <li>Choose your Drywell elevation</li>
            <li>Mark your work location on the map</li>
            <li>Record badge numbers + WO # and required overhead</li>
          </ul>
          <div className="pt-2">
            {/* ✅ Continue goes to /ack */}
            <button className="k-btn" onClick={() => nav('/ack')}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;