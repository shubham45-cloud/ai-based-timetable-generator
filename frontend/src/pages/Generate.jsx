import { useState } from "react";
import axios from "axios";

export default function Generate() {
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const rules = JSON.parse(localStorage.getItem("aiRules"));

      const res = await axios.post(
        "http://localhost:5000/api/generate",
        { rules }
      );

      setTimetable(res.data.timetable);
    } catch (err) {
      console.error(err);
      alert("AI failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Timetable Generate 
      </h1>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Generate Timetable
      </button>

      {loading && <p className="mt-4">🤖 AI is analyzing...</p>}

   {timetable && (
  <div className="mt-6 bg-white rounded-xl shadow p-4">
    <h3 className="font-semibold mb-3">
      📅 Generated Timetable (AI)
    </h3>

    <table className="w-full border text-sm">
      <thead className="bg-slate-100">
        <tr>
          <th className="border p-2">Day</th>
          {timetable[Object.keys(timetable)[0]].map((_, i) => (
            <th key={i} className="border p-2">
              Period {i + 1}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.entries(timetable).map(([day, subjects]) => (
          <tr key={day}>
            <td className="border p-2 font-medium">{day}</td>
            {subjects.map((sub, i) => (
              <td key={i} className="border p-2 text-center">
                {sub}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
}


