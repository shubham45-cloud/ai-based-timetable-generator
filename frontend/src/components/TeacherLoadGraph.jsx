export default function TeacherLoadGraph({ teacher }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-4">
        📊 {teacher.name} – Weekly Load
      </h3>

      {days.map((d) => (
        <div key={d} className="mb-2">
          <p className="text-xs">{d}</p>
          <div className="w-full bg-slate-200 h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${teacher.load[d]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
