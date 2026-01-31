export default function UpcomingLesson({ subject, time }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
      <h4 className="font-semibold">{subject}</h4>
      <p className="text-sm text-slate-500">
        {time}
      </p>
    </div>
  );
}
