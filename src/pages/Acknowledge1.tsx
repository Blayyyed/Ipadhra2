// src/pages/Acknowledge1.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Acknowledge1: React.FC = () => {
  const nav = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checked) {
      // Go to the Drywell area selection list (not a specific map)
      nav("/areas");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">High Radiation Area Entry Requirements</h1>
        <button
          onClick={() => nav(-1)}
          className="text-blue-600 text-sm"
        >
          Back
        </button>
      </div>

      <ol className="list-decimal list-inside space-y-3 text-lg leading-relaxed">
        <li>
          Workers must be logged onto an RWP that allows access to the area.
        </li>
        <li>
          Workers must be briefed and knowledgeable of radiological
          conditions in the work area and travel path.
        </li>
        <li>
          Workers must know their dose estimate. Document expected dose
          on trip ticket.
        </li>
        <li>
          Workers must only enter areas they have been briefed on.
          <br />
          <span className="text-sm text-slate-600">
            Entry into a High Radiation Area is controlled by Technical
            Specifications. Failure to comply with these requirements can
            result in additional worker dose and NRC violations. Personnel
            are authorized to enter ONLY area(s) briefed on.
          </span>
        </li>
      </ol>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-5 w-5"
          />
          <span className="text-lg font-medium">
            I acknowledge and understand these requirements.
          </span>
        </label>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!checked}
            className={`px-6 py-3 rounded-lg text-white ${
              checked ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-400"
            }`}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Acknowledge1;
