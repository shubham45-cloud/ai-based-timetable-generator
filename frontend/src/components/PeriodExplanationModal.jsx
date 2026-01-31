export default function PeriodExplanationModal({ open, onClose, data }) {
  if (!open) return null; // important

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-[360px]">
        <h3 className="font-semibold mb-2">Why this period?</h3>

        <p className="text-sm mb-3">
          <b>{data.subject}</b> on {data.day} {data.period}
        </p>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Teacher was available</li>
          <li>• Preferred morning slot</li>
          <li>• Load balanced</li>
        </ul>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
