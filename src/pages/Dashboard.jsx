export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Track your job applications and stay consistent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
