import { useState } from "react";

export default function Settings() {
  const [aiMode, setAiMode] = useState("Advanced AI");
  const [conflictAutoResolve, setConflictAutoResolve] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-8 bg-[#F5F7FB] min-h-screen">
      <div className="bg-white max-w-xl rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">
          System Settings
        </h2>

        {/* AI MODE */}
        <div className="mb-5">
          <label className="text-sm text-gray-500">
            AI Scheduling Mode
          </label>
          <select
            value={aiMode}
            onChange={(e) => setAiMode(e.target.value)}
            className="input mt-1"
          >
            <option>Constraint Optimized</option>
            <option>Advanced AI</option>
          </select>
        </div>

        {/* TOGGLES */}
        <SettingToggle
          label="Auto Resolve Conflicts"
          value={conflictAutoResolve}
          setValue={setConflictAutoResolve}
        />

        <SettingToggle
          label="Enable Notifications"
          value={notifications}
          setValue={setNotifications}
        />

        <button className="btn-primary mt-6 w-full">
          Save Settings
        </button>
      </div>
    </div>
  );
}

function SettingToggle({ label, value, setValue }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm">{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
    </div>
  );
}


