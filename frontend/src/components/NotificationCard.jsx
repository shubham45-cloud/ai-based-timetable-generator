
export default function NotificationCard({ time, text }) {
  return (
    <div className="flex gap-4 mb-4">
      <span className="text-sm text-slate-500">{time}</span>
      <p className="text-sm text-slate-700">{text}</p>
    </div>
  );
}
