import AdminCommandPanel from "./AdminCommandPanel";
import AdminSmartMenu from "./AdminSmartMenu";

export default function Topbar({ onAddTeacher, onAddSubject }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
      
      <input
        className="w-96 px-4 py-2 rounded-lg bg-slate-100 text-sm outline-none"
        placeholder="Search classes, teachers, subjects..."
      />

      <div className="flex items-center gap-4">
        <button onClick={onAddTeacher} className="btn-secondary">
          + Add Teacher
        </button>

        <button onClick={onAddSubject} className="btn-secondary">
          + Add Subject
        </button>

        {/* 🔥 REPLACEMENT HERE */}
        <AdminCommandPanel />
        <AdminSmartMenu />

      </div>
    </div>
  
  );
}


