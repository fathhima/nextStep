export default function Jobs() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Jobs</h2>
      <p className="text-gray-600 mb-6">
        View all jobs you have applied for.
      </p>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b font-semibold text-gray-700">
          Job Applications
        </div>

        <div className="p-6 text-gray-500 text-center">
          No jobs added yet.
        </div>
      </div>
    </div>
  );
}
