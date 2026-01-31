import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wand2,
  FlaskConical,
  BookOpen,
  Users,
  GraduationCap,
  UserMinus,
  UserX,
  Bell,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">

      {/* LOGO */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🤖 AI Timetable
        </h1>
        <p className="text-xs text-green-400 mt-1">AI Engine Active</p>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-6 text-sm">

        {/* AI OPERATIONS */}
        <Section title="AI OPERATIONS">
          <Item to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <Item to="/generate" icon={<Wand2 size={18} />} label="Timetable Generator" />
          <Item to="/simulation" icon={<FlaskConical size={18} />} label="Simulation" />
        </Section>

        {/* ACADEMIC MANAGEMENT */}
        <Section title="ACADEMIC MANAGEMENT">
          <Item to="/classes" icon={<BookOpen size={18} />} label="Classes" />
          <Item to="/teachers" icon={<Users size={18} />} label="Teachers" />
          <Item to="/subjects" icon={<GraduationCap size={18} />} label="Subjects" />
          <Item to="/student-leave" icon={<UserMinus size={18} />} label="Student Leave" />
          <Item to="/faculty-leave" icon={<UserX size={18} />} label="Faculty Leave" />
        </Section>

        {/* COMMUNICATION */}
        <Section title="COMMUNICATION">
          <Item to="/notices" icon={<Bell size={18} />} label="Notices" />
        </Section>

      </nav>

      {/* SYSTEM */}
      <div className="px-4 py-4 border-t border-slate-700">
        <Item to="/settings" icon={<Settings size={18} />} label="Settings" />
      </div>
    </aside>
  );
}

/* ---------- HELPERS ---------- */

const Section = ({ title, children }) => (
  <div>
    <p className="px-2 mb-2 text-xs text-slate-400 tracking-wider">
      {title}
    </p>
    <div className="space-y-1">{children}</div>
  </div>
);

const Item = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition
       ${
         isActive
           ? "bg-blue-600 text-white shadow"
           : "text-slate-300 hover:bg-slate-700 hover:text-white"
       }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);






