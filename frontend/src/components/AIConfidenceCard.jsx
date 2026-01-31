export default function AIConfidenceCard() {
  const confidence = 92; // abhi fixed

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="text-sm font-semibold mb-2">
        🧠 AI Confidence Score
      </h3>

      <div className="flex gap-4 items-center">
        <div className="text-3xl font-bold text-green-600">
          {confidence}%
        </div>

        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${confidence}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Based on clashes & load balance
          </p>
        </div>
      </div>
    </div>
  );
}
