import React from 'react';
import { useNavigate } from 'react-router-dom';

const Acknowledge: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="k-title mb-4 text-primary">HRA Entry Acknowledgement</h1>

        <div className="k-card space-y-4">
          <p className="text-slate-700">
            Before entering a High Radiation Area, I acknowledge:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-slate-800">
            <li>I have a valid RWP for this work.</li>
            <li>I understand the work scope and the hazards in the area.</li>
            <li>I know the expected dose for this task.</li>
            <li>I will follow HRA postings, boundaries, and instructions at all times.</li>
          </ol>

          <div className="pt-4">
            <button className="k-btn" onClick={() => nav('/areas')}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acknowledge;