import { useState } from "react";

export default function WhatIfSimulator() {
  const [leave, setLeave] = useState(false);
  const [result, setResult] = useState(null);

  const runSimulation = () => {
    if (leave) {
      setResult({
        conflicts: 2,
        suggestion: "Assign OS to Mrs. Gupta",
      });
    } else {
      setResult({
        conflicts: 0,
        suggestion: "Schedule stable",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="text-sm font-semibold mb-3">
        🔄 What-If Simulator
      </h3>

      <label className="flex gap-2 text-sm mb-3">
        <input
          type="checkbox"
          checked={leave}
          onChange={() => setLeave(!leave)}
        />
        Mr. Sharma on Leave
      </label>

      <button
        onClick={runSimulation}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Run Simulation
      </button>

      {result && (
        <div className="mt-3 text-sm text-gray-600">
          <p>⚠ Conflicts: {result.conflicts}</p>
          <p>💡 {result.suggestion}</p>
        </div>
      )}
    </div>
  );
}
