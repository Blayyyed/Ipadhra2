import React from "react";
import { Link } from "react-router-dom";

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-6 w-96 space-y-4 text-center">
        <h1 className="text-2xl font-bold text-rose-600">Access Denied</h1>
        <p className="text-slate-600">
          You must be logged in to view the Admin dashboard.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
