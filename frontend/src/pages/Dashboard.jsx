import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AIRulesEditor from "../components/AIRulesEditor";
import {
  stats,
  teachers as initialTeachers,
  notifications,
} from "../data/dashboardData";
import Modal from "../components/Modal";
import AIExplainPanel from "../components/AIExplainPanel";
import AIConfidenceCard from "../components/AIConfidenceCard";
import WhatIfSimulator from "../components/WhatIfSimulator";
import PeriodExplanationModal from "../components/PeriodExplanationModal";

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);

  const [teacherList, setTeacherList] = useState(initialTeachers);
  const [subjects, setSubjects] = useState([
    "Mathematics",
    "DBMS",
    "Operating Systems",
  ]);

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  const [timetable, setTimetable] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rules, setRules] = useState(null);

  const [infoOpen, setInfoOpen] = useState(false);
  const [info, setInfo] = useState(null);

  /* ---------- AI GENERATE ---------- */
  const handleGenerate = () => {
    const savedRules =
      JSON.parse(localStorage.getItem("aiRules")) || {
        maxPeriodsPerTeacher: 4,
        maxSameSubjectPerDay: 2,
        priority: "balanced",
        balanceLoad: true,
      };

    setRules(savedRules);
    setIsGenerating(true);

    setTimeout(() => {
      setTimetable(mockTimetable());
      setIsGenerating(false);
    }, 1500);
  };

  const filteredTeachers = teacherList
    .filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (filter ? t.status === filter : true));

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar
          search={search}
          setSearch={setSearch}
          onAddTeacher={() => setShowTeacherModal(true)}
          onAddSubject={() => setShowSubjectModal(true)}
        />

        {/* ================= PAGE ================= */}
        <div className="max-w-[1320px] mx-auto px-6 py-8 space-y-10">

          {/* STATS (QUIET) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-90">
            <Stat title="Classes" value={stats.classes} note="Active" />
            <Stat title="Teachers" value={teacherList.length} note="Balanced" />
            <Stat title="Subjects" value={subjects.length} note="Mapped" />
            <Stat title="Schedules" value={stats.schedules} note="AI Generated" />
          </div>

          {/* ================= HERO GRID ================= */}
          <div className="grid grid-cols-12 gap-8">

            {/* LEFT MAIN */}
            <div className="col-span-12 xl:col-span-8 space-y-10">

              {/* HERO AI CONTROL */}
              <div className="bg-white rounded-2xl p-8 border shadow-md">
                <h2 className="text-xl font-semibold mb-1">
                  🧠 AI Timetable Generator
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Configure constraints and let AI generate an optimized timetable
                </p>

                <AIControl
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </div>

              {/* QUICK FILTERS */}
              <div className="grid grid-cols-3 gap-4">
                <QuickCard
                  label="Available Now"
                  color="green"
                  onClick={() => setFilter("available")}
                />
                <QuickCard
                  label="In Class"
                  color="blue"
                  onClick={() => setFilter("inClass")}
                />
                <QuickCard
                  label="On Leave"
                  color="red"
                  onClick={() => setFilter("onLeave")}
                />
              </div>

              {/* TEACHER AVAILABILITY */}
              <TeacherAvailability
                teachers={filteredTeachers}
                onInfo={(data) => {
                  setInfo(data);
                  setInfoOpen(true);
                }}
              />

              {/* AI RULES + SUMMARY */}
              <div className="bg-white rounded-2xl p-6 border grid grid-cols-1 md:grid-cols-2 gap-8">
                <AIRulesEditor />
                <AIInsight
                  isGenerating={isGenerating}
                  timetable={timetable}
                  rules={rules}
                />
              </div>

              {/* COURSE REVIEW */}
              <CourseReview />
            </div>

            {/* RIGHT AI BRAIN */}
            <div className="col-span-12 xl:col-span-4 space-y-6 sticky top-24 self-start">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <AIExplainPanel />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <AIConfidenceCard />
              </div>

              <div className="bg-white border rounded-2xl p-6">
                <WhatIfSimulator />
              </div>

              <div className="bg-white border rounded-2xl p-6">
                <Notifications />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {showTeacherModal && (
        <Modal title="Add Teacher" onClose={() => setShowTeacherModal(false)}>
          <TeacherForm
            onSave={(teacher) => {
              setTeacherList([...teacherList, teacher]);
              setShowTeacherModal(false);
            }}
          />
        </Modal>
      )}

      {showSubjectModal && (
        <Modal title="Add Subject" onClose={() => setShowSubjectModal(false)}>
          <SubjectForm
            onSave={(subject) => {
              setSubjects([...subjects, subject]);
              setShowSubjectModal(false);
            }}
          />
        </Modal>
      )}

      <PeriodExplanationModal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        data={info}
      />
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Stat = ({ title, value, note }) => (
  <div className="bg-white rounded-lg p-4 border">
    <p className="text-sm">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
    <p className="text-green-600 text-xs">{note}</p>
  </div>
);

const QuickCard = ({ label, color, onClick }) => {
  const colors = {
    green: "text-green-600",
    blue: "text-blue-600",
    red: "text-red-600",
  };
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl border cursor-pointer hover:shadow-md transition"
    >
      <p className="text-sm">{label}</p>
      <p className={`font-semibold ${colors[color]}`}>View</p>
    </div>
  );
};

/* ---------- TEACHER TABLE ---------- */
function TeacherAvailability({ teachers, onInfo }) {
  return (
    <div className="bg-white rounded-2xl p-6 border">
      <h2 className="font-semibold mb-4">Teacher Availability</h2>

      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th>Teacher</th>
            <th>Subject</th>
            <th>Cabin</th>
            <th>Load</th>
            <th>Efficiency</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id} className="border-t h-12 text-center">
              <td className="text-left">{t.name}</td>
              <td>{t.subject}</td>
              <td>{t.cabin}</td>
              <td>{t.load}</td>
              <td>
                <div className="bg-slate-200 h-2 rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${t.efficiency}%` }}
                  />
                </div>
              </td>
              <td className="capitalize">{t.status}</td>
              <td>
                <button
                  onClick={() =>
                    onInfo({
                      subject: t.subject,
                      day: "Tuesday",
                      period: "P1",
                    })
                  }
                >
                  ℹ️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- AI INSIGHT ---------- */
function AIInsight({ isGenerating, timetable, rules }) {
  if (isGenerating) {
    return (
      <div className="bg-blue-600 text-white rounded-xl h-[220px] flex items-center justify-center font-semibold">
        🤖 AI is generating timetable…
      </div>
    );
  }

  if (!timetable) {
    return (
      <div className="bg-slate-50 rounded-xl h-[220px] flex items-center justify-center text-gray-500">
        Click <b className="mx-1">Generate Timetable</b> to start
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold mb-3">AI Scheduling Summary</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>✔ Conflicts resolved automatically</li>
        <li>✔ Teacher load balanced</li>
        <li>✔ Labs scheduled optimally</li>
        <li>✔ Priority mode: {rules?.priority}</li>
      </ul>
    </div>
  );
}

/* ---------- AI CONTROL ---------- */
const AIControl = ({ onGenerate, isGenerating }) => (
  <div className="space-y-3">
    <select className="input"><option>Mon–Fri</option></select>
    <select className="input"><option>5 Periods</option></select>
    <select className="input"><option>Advanced AI</option></select>

    <button
      onClick={onGenerate}
      disabled={isGenerating}
      className="btn-primary w-full"
    >
      {isGenerating ? "Generating…" : "Generate Timetable"}
    </button>
  </div>
);

const Notifications = () => (
  <div>
    <h3 className="font-semibold mb-3">Notifications</h3>
    <ul className="text-sm space-y-2">
      {notifications.map((n, i) => (
        <li key={i}>{n}</li>
      ))}
    </ul>
  </div>
);

const CourseReview = () => (
  <div className="bg-white rounded-2xl p-6 border">
    <h2 className="font-semibold mb-4">Course Performance Review</h2>
    <div className="grid grid-cols-3 gap-4 text-sm">
      <Review title="AI Scheduling" text="High student engagement" />
      <Review title="DBMS" text="Smooth timetable flow" />
      <Review title="Operating Systems" text="Needs better spacing" />
    </div>
  </div>
);

const Review = ({ title, text }) => (
  <div className="border rounded-lg p-4">
    <p className="font-medium">{title}</p>
    <p className="text-xs text-gray-500 mt-1">{text}</p>
  </div>
);

/* ---------- FORMS ---------- */
function SubjectForm({ onSave }) {
  const [name, setName] = useState("");
  return (
    <div className="space-y-3">
      <input
        className="input"
        placeholder="Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn-primary w-full" onClick={() => name && onSave(name)}>
        Save Subject
      </button>
    </div>
  );
}

function TeacherForm({ onSave }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [cabin, setCabin] = useState("");
  const [status, setStatus] = useState("available");

  const handleSave = () => {
    if (!name || !subject) return;
    onSave({
      id: Date.now(),
      name,
      subject,
      cabin: cabin || "N/A",
      load: "Balanced",
      efficiency: 80,
      status,
    });
  };

  return (
    <div className="space-y-3">
      <input className="input" placeholder="Teacher Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="input" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <input className="input" placeholder="Cabin" value={cabin} onChange={(e) => setCabin(e.target.value)} />
      <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="available">Available</option>
        <option value="inClass">In Class</option>
        <option value="onLeave">On Leave</option>
      </select>
      <button className="btn-primary w-full" onClick={handleSave}>Save Teacher</button>
    </div>
  );
}

/* ---------- MOCK ---------- */
function mockTimetable() {
  return {
    "CSE-A": {
      Monday: ["Math", "DBMS", "OS"],
      Tuesday: ["AI", "Math", "DBMS"],
    },
  };
}
