export default function AIExplainPanel({ timetable }) {
  if (!timetable) {
    return (
      <div className="text-sm text-gray-500">
        🧠 AI explanations will appear here after timetable generation.
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">AI Decision Explanation</h3>
      <ul className="text-sm space-y-2 text-gray-600">
        <li>• Monday P2: OS placed (teacher free)</li>
        <li>• Tuesday P1: Math (load balanced)</li>
      </ul>
    </div>
  );
}

