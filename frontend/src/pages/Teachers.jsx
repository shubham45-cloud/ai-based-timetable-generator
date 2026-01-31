import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Teachers() {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Mr. Rahul Sharma",
      subjects: ["Maths"],
      availability: "available",
      load: "Balanced",
      maxPeriods: 4,
      efficiency: 92,
    },
    {
      id: 2,
      name: "Ms. Sonali Verma",
      subjects: ["DBMS"],
      availability: "inClass",
      load: "Optimized",
      maxPeriods: 5,
      efficiency: 88,
    },
    {
      id: 3,
      name: "Mrs. Nishu Sharma",
      subjects: ["OS"],
      availability: "onLeave",
      load: "Overloaded",
      maxPeriods: 3,
      efficiency: 71,
    },
  ]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const stats = {
    total: teachers.length,
    available: teachers.filter(t => t.availability === "available").length,
    overloaded: teachers.filter(t => t.load === "Overloaded").length,
    onLeave: teachers.filter(t => t.availability === "onLeave").length,
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Teacher Management</h1>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4">
            <Stat title="Total Teachers" value={stats.total} />
            <Stat title="Available" value={stats.available} color="green" />
            <Stat title="Overloaded" value={stats.overloaded} color="red" />
            <Stat title="On Leave" value={stats.onLeave} color="yellow" />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow p-5">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-2 text-left">Teacher</th>
                  <th className="p-2">Subjects</th>
                  <th className="p-2">Availability</th>
                  <th className="p-2">Load</th>
                  <th className="p-2">Max / Day</th>
                  <th className="p-2">Efficiency</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map(t => (
                  <tr key={t.id} className="border-t text-center">
                    <td className="p-2 text-left font-medium">{t.name}</td>
                    <td className="p-2">{t.subjects.join(", ")}</td>
                    <td className="p-2">
                      <Badge type={t.availability} />
                    </td>
                    <td
                      className={`p-2 font-medium ${
                        t.load === "Overloaded"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {t.load}
                    </td>
                    <td className="p-2">{t.maxPeriods}</td>
                    <td className="p-2">
                      <div className="bg-slate-200 h-2 rounded">
                        <div
                          className="bg-green-500 h-2 rounded"
                          style={{ width: `${t.efficiency}%` }}
                        />
                      </div>
                      <span className="text-xs">{t.efficiency}%</span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => setSelectedTeacher(t)}
                        className="text-blue-600 text-xs"
                      >
                        View AI Insights
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI NOTE */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
            🤖 <b>AI Insight:</b> Overloaded teachers will be avoided during
            timetable generation.
          </div>
        </div>
      </div>

      {/* DRAWER */}
      {selectedTeacher && (
        <TeacherDrawer
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
}

/* ================= DRAWER ================= */

function TeacherDrawer({ teacher, onClose }) {
  const weeklyLoad = {
    Monday: 4,
    Tuesday: 2,
    Wednesday: 5,
    Thursday: 3,
    Friday: 1,
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
      <div className="w-[380px] bg-white h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{teacher.name}</h2>
          <button onClick={onClose}>❌</button>
        </div>

        <div className="space-y-2 text-sm">
          <p><b>Subjects:</b> {teacher.subjects.join(", ")}</p>
          <p><b>Availability:</b> {teacher.availability}</p>
          <p><b>Load:</b> {teacher.load}</p>
          <p><b>Max Periods / Day:</b> {teacher.maxPeriods}</p>
          <p><b>Efficiency:</b> {teacher.efficiency}%</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Weekly Teaching Load</h3>

          <div className="space-y-2">
            {Object.entries(weeklyLoad).map(([day, count]) => (
              <div key={day}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{day}</span>
                  <span>{count} periods</span>
                </div>
                <div className="bg-slate-200 h-2 rounded">
                  <div
                    className={`h-2 rounded ${
                      count >= 4 ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${count * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm">
          <h4 className="font-semibold mb-2">🤖 AI Suggestions</h4>
          <ul className="list-disc pl-4 space-y-1">
            <li>Avoid Wednesday overload</li>
            <li>Prefer morning slots</li>
            <li>Reduce back-to-back classes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Stat = ({ title, value, color = "blue" }) => {
  const colorMap = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold ${colorMap[color]}`}>
        {value}
      </h2>
    </div>
  );
};

const Badge = ({ type }) => {
  const map = {
    available: "bg-green-100 text-green-700",
    inClass: "bg-blue-100 text-blue-700",
    onLeave: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${map[type]}`}>
      {type}
    </span>
  );
};



