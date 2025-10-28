import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Welcome to the Drywell Entry Kiosk
      </h1>

      <p className="text-lg leading-relaxed">
        This is not intended to take the place of your RP brief but intended to
        decrease your time needed interfacing with RP. At the beginning of your
        shift, if you know you will be needing to enter the Drywell, you can
        acknowledge you understand some of the requirements to enter a High
        Radiation Area.
      </p>

      <p className="text-lg leading-relaxed">
        During this process you mark on the elevation map where you will be
        working, if an overhead is needed and how high, then badge numbers and
        work order number are entered. From there RP can have everything
        prepared ahead of time for a more efficient brief.
      </p>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => nav("/acknowledge")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Welcome;
