import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Classes() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "CSE-A",
      students: 60,
      capacity: 70,
      sections: 2,
      load: "High",
      timetable: null,
    },
    {
      id: 2,
      name: "CSE-B",
      students: 58,
      capacity: 70,
      sections: 1,
      load: "Balanced",
      timetable: null,
    },
  ]);

  const [loadingId, setLoadingId] = useState(null);
  const [preview, setPreview] = useState(null);

  /* 🔥 AI TIMETABLE GENERATOR (STEP-1) */
  const generateTimetableForClass = (classId) => {
    setLoadingId(classId);

    const rules =
      JSON.parse(localStorage.getItem("aiRules")) || {
        maxPeriodsPerTeacher: 4,
        maxSameSubjectPerDay: 2,
        priority: "balanced",
      };

    console.log("AI Rules Used:", rules);

    setTimeout(() => {
      const timetable = {
        Monday: ["Math", "DBMS", "OS"],
        Tuesday: ["AI", "Math", "DBMS"],
        Wednesday: ["OS", "AI", "Math"],
      };

      setClasses((prev) =>
        prev.map((c) =>
          c.id === classId ? { ...c, timetable } : c
        )
      );

      setPreview({ classId, timetable });
      setLoadingId(null);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Class Management</h1>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow p-5">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 text-left">Class</th>
                <th className="p-2">Students</th>
                <th className="p-2">Load</th>
                <th className="p-2">Timetable</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((c) => (
                <tr key={c.id} className="border-t text-center">
                  <td className="p-2 text-left font-medium">{c.name}</td>

                  <td className="p-2">
                    {c.students}/{c.capacity}
                  </td>

                  <td
                    className={`p-2 font-medium ${c.load === "High"
                      ? "text-red-600"
                      : "text-green-600"
                      }`}
                  >
                    {c.load}
                  </td>

                  <td className="p-2">
                    {c.timetable ? (
                      <span className="text-green-600">
                        Generated
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() =>
                        generateTimetableForClass(c.id)
                      }
                      disabled={loadingId === c.id}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                    >
                      {loadingId === c.id
                        ? "AI Analyzing..."
                        : "Generate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 🔥 STEP-2: TIMETABLE GRID PREVIEW */}
        {preview && (
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold mb-4">
              Generated Timetable –{" "}
              {
                classes.find((c) => c.id === preview.classId)
                  ?.name
              }
            </h3>

            <table className="w-full border text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border p-2">Day</th>
                  {[1, 2, 3, 4, 5].map((p) => (
                    <th key={p} className="border p-2">
                      P{p}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Object.entries(preview.timetable).map(
                  ([day, periods]) => (
                    <tr key={day}>
                      <td className="border p-2 font-medium">
                        {day}
                      </td>

                      {[...Array(5)].map((_, i) => (
                        <td
                          key={i}
                          className="border p-2 text-center"
                        >
                          {periods[i] || "—"}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
          </div>
          </div>
        );
      }

