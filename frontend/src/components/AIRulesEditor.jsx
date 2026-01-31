import { useState } from "react";

export default function AIRulesEditor({ onSave }) {
  const [rules, setRules] = useState({
    maxPeriodsPerTeacher: 4,
    maxSameSubjectPerDay: 2,
    allowBackToBack: false,
    preferMorningLabs: true,
    avoidTeacherClash: true,
    balanceLoad: true,
    priority: "balanced",
  });

  const handleChange = (key, value) => {
    setRules({ ...rules, [key]: value });
  };

  const handleSave = () => {
    localStorage.setItem("aiRules", JSON.stringify(rules));
    onSave && onSave(rules);
    alert("AI Rules Saved Successfully ✅");
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-4">
      <h3 className="font-semibold text-lg">AI Rules Editor</h3>

      {/* MAX PERIODS */}
      <div>
        <label className="text-sm text-gray-600">
          Max Periods per Teacher (per day)
        </label>
        <input
          type="number"
          value={rules.maxPeriodsPerTeacher}
          onChange={(e) =>
            handleChange("maxPeriodsPerTeacher", +e.target.value)
          }
          className="input mt-1"
        />
      </div>

      {/* SAME SUBJECT */}
      <div>
        <label className="text-sm text-gray-600">
          Max Same Subject per Day
        </label>
        <input
          type="number"
          value={rules.maxSameSubjectPerDay}
          onChange={(e) =>
            handleChange("maxSameSubjectPerDay", +e.target.value)
          }
          className="input mt-1"
        />
      </div>

      {/* CHECKBOX RULES */}
      <div className="space-y-2 text-sm">
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={rules.allowBackToBack}
            onChange={(e) =>
              handleChange("allowBackToBack", e.target.checked)
            }
          />
          Allow Back-to-Back Classes
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={rules.preferMorningLabs}
            onChange={(e) =>
              handleChange("preferMorningLabs", e.target.checked)
            }
          />
          Prefer Morning Labs
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={rules.avoidTeacherClash}
            onChange={(e) =>
              handleChange("avoidTeacherClash", e.target.checked)
            }
          />
          Avoid Teacher Clashes
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={rules.balanceLoad}
            onChange={(e) =>
              handleChange("balanceLoad", e.target.checked)
            }
          />
          Balance Teacher Load
        </label>
      </div>

      {/* PRIORITY */}
      <div>
        <label className="text-sm text-gray-600">Priority Mode</label>
        <select
          value={rules.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="input mt-1"
        >
          <option value="teacher">Teacher Friendly</option>
          <option value="student">Student Friendly</option>
          <option value="balanced">Balanced</option>
        </select>
      </div>

      <button onClick={handleSave} className="btn-primary w-full">
        Save AI Rules
      </button>
    </div>
  );
}
