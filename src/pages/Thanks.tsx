import React from 'react';
import { Link } from 'react-router-dom';

const Thanks: React.FC = () => (
  <div className="h-screen grid place-items-center p-6">
    <div className="text-center space-y-3">
      <h1 className="text-2xl font-bold">Entry recorded</h1>
      <p className="text-slate-600">
        You’re marked as <b>Entry Pending</b>. Stand by for HRA brief.
      </p>
      <Link to="/" className="text-blue-600">
        &larr; Back to Home
      </Link>
    </div>
  </div>
);

export default Thanks;