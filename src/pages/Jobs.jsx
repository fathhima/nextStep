// src/pages/Jobs.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailModal from "../components/EmailModal";
import { getJobs, deleteJob, updateJobStatus } from "../utils/storage";
import toast from "react-hot-toast";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const jobsData = await getJobs();
      setJobs(jobsData);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status: newStatus } : job
    );

    setJobs(updatedJobs);

    try {
      await updateJobStatus(id, newStatus);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-800">
            Are you sure you want to delete this job?
          </p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);

                // UI update instantly
                const updatedJobs = jobs.filter((job) => job.id !== id);
                setJobs(updatedJobs);

                try {
                  await deleteJob(id);
                  toast.success("Job deleted successfully");
                } catch (error) {
                  toast.error("Failed to delete job");
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
  };

  const getPriority = (job) => {
    if (job.status === "Rejected" || job.status === "Offer") {
      return { label: "Closed", style: "bg-gray-200 text-gray-700" };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const followUp = new Date(job.followUpDate);
    followUp.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((followUp - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: "Overdue", style: "bg-red-100 text-red-700" };
    }

    if (diffDays <= 2) {
      return { label: "Due Soon", style: "bg-yellow-100 text-yellow-800" };
    }

    return { label: "Not Due", style: "bg-green-100 text-green-700" };
  };

  const handleGenerateEmail = (job) => {
    setSelectedJob(job);
    setIsEmailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEmailModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Jobs</h2>
            <p className="text-gray-600 mt-1">
              View and manage all your job applications.
            </p>
          </div>

          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            + Add Job
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white border shadow-sm rounded-2xl p-10 text-center text-gray-600 font-medium">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border shadow-sm rounded-2xl p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              No job applications yet
            </h3>
            <p className="text-gray-600 mt-2">
              Start by adding your first job application.
            </p>

            <button
              onClick={() => navigate("/add")}
              className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Add Your First Job
            </button>
          </div>
        ) : (
          <div className="bg-white border shadow-sm rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Follow-up Date</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job) => {
                    const priority = getPriority(job);

                    return (
                      <tr
                        key={job.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {job.company}
                        </td>

                        <td className="px-6 py-4 text-gray-700">{job.role}</td>

                        <td className="px-6 py-4">
                          <select
                            value={job.status}
                            onChange={(e) =>
                              handleStatusChange(job.id, e.target.value)
                            }
                            className="border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Offer">Offer</option>
                          </select>
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          {job.followUpDate}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.style}`}
                          >
                            {priority.label}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-wrap justify-center gap-2">
                            <button
                              onClick={() => handleGenerateEmail(job)}
                              className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                            >
                              Generate Email
                            </button>

                            {job.link ? (
                              <a
                                href={job.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
                              >
                                Link
                              </a>
                            ) : (
                              <span className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-400 font-medium">
                                No Link
                              </span>
                            )}

                            <button
                              onClick={() => handleDelete(job.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
              Total Jobs: <span className="font-semibold">{jobs.length}</span>
            </div>
          </div>
        )}
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
      />
    </div>
  );
}