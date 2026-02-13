export default function AddJob() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-2">Add Job</h2>
            <p className="text-gray-600 mb-6">
                Add a new job application to your tracker.
            </p>

            <form className="bg-white p-6 rounded-xl shadow-sm border max-w-xl">
                <div className="mb-4">
                    <label className="block font-medium mb-1">Company Name</label>
                    <input
                        type="text"
                        placeholder="Eg: Google"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Job Role</label>
                    <input
                        type="text"
                        placeholder="Eg: Frontend Developer"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Status</label>
                    <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="pending">Pending</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
                        <option value="selected">Selected</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Add Job
                </button>
            </form>
        </div>
    );
}
