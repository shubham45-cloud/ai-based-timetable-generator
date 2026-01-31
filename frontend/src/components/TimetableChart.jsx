import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "Pending", value: 10 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function TimetableChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Timetable Generation Status
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-around mt-4 text-sm">
        <span className="text-green-600">● Completed</span>
        <span className="text-yellow-500">● In Progress</span>
        <span className="text-red-500">● Pending</span>
      </div>
    </div>
  );
}

