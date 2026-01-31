import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSmartMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* TOP BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border shadow-sm hover:bg-slate-50"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm">
          A
        </div>
        <div className="text-left text-sm">
          <div className="font-semibold leading-4">Admin</div>
          <div className="text-xs text-green-600">AI Active</div>
        </div>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border z-50 p-3">
          
          {/* ADMIN INFO */}
          <div className="border-b pb-3 mb-3">
            <p className="font-semibold">Admin Kumar</p>
            <p className="text-xs text-gray-500">Super Admin</p>
            <p className="text-xs text-gray-400 mt-1">
              Last login: 2 hours ago
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mb-3">
            <p className="text-xs uppercase text-gray-400 mb-2">
              Quick Actions
            </p>

            <button
              onClick={() => navigate("/simulation")}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm"
            >
              🧪 Run Simulation
            </button>

            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm"
            >
              🔁 Regenerate Timetable
            </button>

            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm"
            >
              ⚠️ View Conflicts
            </button>
          </div>

          {/* AI STATUS */}
          <div className="mb-3">
            <p className="text-xs uppercase text-gray-400 mb-2">
              AI Status
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>🧠 Engine: <b>Running</b></p>
              <p>📊 Efficiency: <b>92%</b></p>
              <p>🔁 Last Run: <b>2 mins ago</b></p>
            </div>
          </div>

          {/* ACCOUNT */}
          <div className="border-t pt-2">
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm"
            >
              👤 Admin Profile
            </button>

            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-sm text-red-600"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
