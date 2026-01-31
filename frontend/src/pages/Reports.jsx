import Sidebar from "../components/Sidebar";

export default function Reports() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>

        <ul className="bg-white rounded shadow p-6 space-y-3">
          <li>📊 Conflicts Resolved: 120</li>
          <li>⚖️ Teacher Load Balanced</li>
          <li>🏫 Room Utilization: 95%</li>
          <li>⏱ Time Saved: 80%</li>
        </ul>
      </div>
    </div>
  );
}

