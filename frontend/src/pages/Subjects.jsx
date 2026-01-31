import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Subjects() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Mathematics",
      type: "Theory",
      weeklyHours: 5,
      priority: "High",
      backToBack: false,
      risk: "Low",
      aiRules: {
        maxPerDay: 2,
        allowBackToBack: false,
        preferredSlot: "Any",
      },
    },
    {
      id: 2,
      name: "DBMS",
      type: "Lab",
      weeklyHours: 4,
      priority: "High",
      backToBack: true,
      risk: "Medium",
      aiRules: {
        maxPerDay: 1,
        allowBackToBack: true,
        preferredSlot: "Morning",
      },
    },
  ]);

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Topbar />

        <h1 className="text-2xl font-semibold">Subject Management</h1>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4">
          <Stat title="Total Subjects" value={subjects.length} />
          <Stat
            title="Lab Subjects"
            value={subjects.filter(s => s.type === "Lab").length}
          />
          <Stat
            title="Core Subjects"
            value={subjects.filter(s => s.priority === "High").length}
          />
          <Stat
            title="High Conflict Risk"
            value={subjects.filter(s => s.risk === "High").length}
          />
        </div>

        {/* SUBJECT TABLE */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">AI Subject Configuration</h2>
            <button
              onClick={() => setShowModal(true)}
              className="btn-blue"
            >
              + Add Subject
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 text-left">Subject</th>
                <th>Type</th>
                <th>Weekly Hrs</th>
                <th>Priority</th>
                <th>Conflict Risk</th>
                <th>AI Rules</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((s) => (
                <tr key={s.id} className="border-t text-center">
                  <td className="p-2 text-left font-medium">{s.name}</td>
                  <td>{s.type}</td>
                  <td>{s.weeklyHours}</td>
                  <td className={s.priority === "High" ? "text-red-600" : ""}>
                    {s.priority}
                  </td>
                  <td
                    className={
                      s.risk === "High"
                        ? "text-red-600"
                        : s.risk === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {s.risk}
                  </td>
                  <td>
                    <button
                      className="text-blue-600 text-xs underline"
                      onClick={() => setSelectedSubject(s)}
                    >
                      Edit AI Rules
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD SUBJECT MODAL */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3 className="font-semibold mb-4">Add New Subject</h3>
          <input className="input mb-3" placeholder="Subject Name" />
          <select className="input mb-3">
            <option>Theory</option>
            <option>Lab</option>
          </select>
          <button className="btn-primary w-full">Save Subject</button>
        </Modal>
      )}

      {/* AI RULES MODAL */}
      {selectedSubject && (
        <Modal onClose={() => setSelectedSubject(null)}>
          <h3 className="font-semibold mb-4">
            AI Rules – {selectedSubject.name}
          </h3>

          <div className="space-y-3">
            <label className="text-sm">Max classes per day</label>
            <input
              type="number"
              className="input"
              value={selectedSubject.aiRules.maxPerDay}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  aiRules: {
                    ...selectedSubject.aiRules,
                    maxPerDay: Number(e.target.value),
                  },
                })
              }
            />

            <label className="text-sm">Preferred Slot</label>
            <select
              className="input"
              value={selectedSubject.aiRules.preferredSlot}
              onChange={(e) =>
                setSelectedSubject({
                  ...selectedSubject,
                  aiRules: {
                    ...selectedSubject.aiRules,
                    preferredSlot: e.target.value,
                  },
                })
              }
            >
              <option>Any</option>
              <option>Morning</option>
              <option>Afternoon</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedSubject.aiRules.allowBackToBack}
                onChange={(e) =>
                  setSelectedSubject({
                    ...selectedSubject,
                    aiRules: {
                      ...selectedSubject.aiRules,
                      allowBackToBack: e.target.checked,
                    },
                  })
                }
              />
              Allow Back-to-Back Classes
            </label>

            <button
              className="btn-primary w-full mt-4"
              onClick={() => {
                setSubjects(prev =>
                  prev.map(sub =>
                    sub.id === selectedSubject.id ? selectedSubject : sub
                  )
                );
                setSelectedSubject(null);
              }}
            >
              Save AI Rules
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* SMALL COMPONENTS */

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-96">
      <div className="flex justify-end">
        <button onClick={onClose}>✖</button>
      </div>
      {children}
    </div>
  </div>
);
