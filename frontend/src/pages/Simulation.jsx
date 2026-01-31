import { useState } from "react";

export default function Simulation() {
  const [teacher, setTeacher] = useState("Mr. Sharma");
  const [scenario, setScenario] = useState("leave");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runSimulation = () => {
    setLoading(true);
    setResult(null);

    // Fake AI processing delay
    setTimeout(() => {
      setResult({
        conflicts: scenario === "leave" ? "+1" : "-1",
        efficiency: scenario === "leave" ? "-8%" : "+6%",
        balance: scenario === "leave" ? "Low" : "Good",
        explanation: [
          `${teacher} marked unavailable`,
          "OS shifted to Tue P3",
          "Wednesday load exceeded threshold",
          "AI suggests lab swap to restore balance",
        ],
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🧪 AI What-If Simulation
        </h1>
        <p className="text-sm text-gray-500">
          Test timetable scenarios without affecting live data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: CONTROLS */}
        <div className="bg-white rounded-xl p-4 shadow-sm border space-y-4">
          <h3 className="font-semibold">Simulation Inputs</h3>

          <div>
            <label className="text-sm text-gray-600">Teacher</label>
            <select
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option>Mr. Sharma</option>
              <option>Ms. Verma</option>
              <option>Mr. Singh</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Scenario</label>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="leave">Teacher on Leave</option>
              <option value="extra">Extra Period Assigned</option>
              <option value="reduce">Reduce Load</option>
            </select>
          </div>

          <button
            onClick={runSimulation}
            disabled={loading}
            className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Running AI Simulation..." : "Run Simulation"}
          </button>

          <p className="text-xs text-gray-400">
            No real timetable will be modified
          </p>
        </div>

        {/* MIDDLE: AI PREDICTION */}
        <div className="bg-white rounded-xl p-4 shadow-sm border space-y-4">
          <h3 className="font-semibold">📊 AI Predicted Impact</h3>

          {!result && !loading && (
            <p className="text-sm text-gray-400">
              Run simulation to see AI prediction
            </p>
          )}

          {loading && (
            <p className="text-sm text-blue-500 animate-pulse">
              AI analyzing constraints & conflicts...
            </p>
          )}

          {result && (
            <>
              <div className="flex justify-between text-sm">
                <span>Conflicts</span>
                <span className="text-red-500 font-semibold">
                  {result.conflicts}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Efficiency</span>
                <span className="text-green-600 font-semibold">
                  {result.efficiency}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Teacher Load Balance</span>
                <span className="text-yellow-500 font-semibold">
                  {result.balance}
                </span>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: AI EXPLANATION */}
        <div className="bg-white rounded-xl p-4 shadow-sm border space-y-3">
          <h3 className="font-semibold">🧠 AI Explanation</h3>

          {!result && (
            <p className="text-sm text-gray-400">
              AI explanation will appear here
            </p>
          )}

          {result && (
            <ul className="text-sm text-gray-700 space-y-2">
              {result.explanation.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          )}

          <p className="text-xs text-gray-400 mt-4">
            Explainable AI ensures transparency
          </p>
        </div>

      </div>
    </div>
  );
}

