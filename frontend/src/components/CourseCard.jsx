export default function CourseCard({ title, progress, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <span
        className={`inline-block px-3 py-1 text-xs rounded-full text-white bg-${color}-500`}
      >
        {title}
      </span>

      <p className="mt-3 text-sm text-slate-600">
        AI Timetable Course A–Z
      </p>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`bg-${color}-500 h-2 rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
