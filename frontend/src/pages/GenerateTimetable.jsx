import { useState } from "react";
import ConflictHeatmap from "../components/ConflictHeatmap";
import TimetableGrid from "../components/TimetableGrid";

export default function GenerateTimetable() {
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setTimetable(null);

    const rules = JSON.parse(localStorage.getItem("aiRules"));

    if (!rules) {
      alert("Please configure AI Rules first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rules }),
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();
      setTimetable(data.timetable);

    } catch (err) {
      console.error(err);
      setError("AI failed to generate timetable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        AI Timetable Generator
      </h1>

      <button
        onClick={handleGenerate}
        className="btn-primary"
        disabled={loading}
      >
        {loading ? "AI Analyzing..." : "Generate Timetable"}
      </button>

      {loading && (
        <div className="bg-blue-50 p-4 rounded text-sm">
          🤖 AI is analyzing rules, checking conflicts & optimizing schedule...
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded">
          {error}
        </div>
      )}

      {timetable && (
        <>
          <TimetableGrid timetable={timetable} />
          <ConflictHeatmap timetable={timetable} />
        </>
      )}
    </div>
  );
}



