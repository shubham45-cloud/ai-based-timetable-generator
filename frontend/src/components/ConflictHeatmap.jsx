export default function ConflictHeatmap({ data }) {
  const colors = {
    safe: "bg-green-500",
    warning: "bg-yellow-400",
    conflict: "bg-red-500",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-4">
        🔥 Teacher vs Day Conflict Heatmap
      </h3>

      <table className="w-full text-sm border">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-2">Teacher</th>
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.teacher} className="border-t">
              <td className="p-2 font-medium">{row.teacher}</td>
              {row.days.map((d, i) => (
                <td key={i} className="p-2 text-center">
                  <span
                    className={`inline-block w-4 h-4 rounded ${colors[d]}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 mt-3">
        🟢 Safe &nbsp; 🟡 Overload &nbsp; 🔴 Conflict
      </p>
    </div>
  );
}

