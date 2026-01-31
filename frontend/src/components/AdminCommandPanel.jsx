import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminCommandPanel() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border shadow-sm hover:bg-slate-50"
      >
        🧠 <span className="font-semibold">AI Admin</span>
        <span className="text-xs text-green-500">● Active</span>
      </button>

      {/* PANEL */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
          <h4 className="font-semibold mb-3">
            AI Command Center
          </h4>

          <div className="space-y-2 text-sm text-gray-700">
            <p>⚙️ Engine Status: <b>Running</b></p>
            <p>📊 Efficiency Score: <b>92%</b></p>
            <p>⚠️ Active Conflicts: <b>1</b></p>
            <p>🔁 Last Run: <b>2 mins ago</b></p>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => navigate("/simulation")}
              className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm"
            >
              🧪 Run Simulation
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="w-full py-2 rounded-lg bg-slate-200 text-sm"
            >
              ⚙️ AI Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
