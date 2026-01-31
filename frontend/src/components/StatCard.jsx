import { useNavigate } from "react-router-dom";

export default function StatCard({ title, value, note, route, icon }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{title}</p>
        <span>{icon}</span>
      </div>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-xs text-green-600 mt-1">{note}</p>
    </div>
  );
}






