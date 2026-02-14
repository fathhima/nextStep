// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { getJobs } from "../utils/storage";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const jobsData = await getJobs();
      setJobs(jobsData);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  const totalApplications = jobs.length;

  const appliedCount = jobs.filter((job) => job.status === "Applied").length;

  const interviewCount = jobs.filter((job) => job.status === "Interview").length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followUpsDue = jobs.filter((job) => {
    if (job.status === "Rejected" || job.status === "Offer") return false;

    const followUpDate = new Date(job.followUpDate);
    followUpDate.setHours(0, 0, 0, 0);

    return followUpDate <= today;
  });

  const recentApplications = [...jobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">
            Track your job applications, follow-ups, and progress.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white border shadow-sm rounded-2xl p-10 text-center text-gray-600 font-medium">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <StatsCard
                title="Total Applications"
                value={totalApplications}
                subtitle="All job applications tracked"
              />

              <StatsCard
                title="Applied"
                value={appliedCount}
                subtitle="Waiting for response"
              />

              <StatsCard
                title="Interviews"
                value={interviewCount}
                subtitle="Active interview processes"
              />

              <StatsCard
                title="Follow-ups Due"
                value={followUpsDue.length}
                subtitle="Need to follow up today or overdue"
              />
            </div>

            {/* Follow-ups Due */}
            <div className="bg-white border shadow-sm rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Follow-ups Due
              </h3>
              <p className="text-gray-600 text-sm mb-5">
                Applications where follow-up date is today or overdue.
              </p>

              {followUpsDue.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">
                  No follow-ups due 🎉
                </p>
              ) : (
                <div className="space-y-3">
                  {followUpsDue.map((job) => (
                    <div
                      key={job.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border rounded-xl px-4 py-3 bg-gray-50"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {job.role} - {job.company}
                        </p>
                        <p className="text-sm text-gray-600">
                          Follow-up Date:{" "}
                          <span className="font-medium">
                            {job.followUpDate}
                          </span>
                        </p>
                      </div>

                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 w-fit">
                        Due
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Applications */}
            <div className="bg-white border shadow-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Recent Applications
              </h3>
              <p className="text-gray-600 text-sm mb-5">
                Your latest job applications (last 5).
              </p>

              {recentApplications.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">
                  No applications yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Company</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Applied Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentApplications.map((job) => (
                        <tr
                          key={job.id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {job.company}
                          </td>
                          <td className="px-4 py-3 text-gray-700">{job.role}</td>
                          <td className="px-4 py-3">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              {job.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {job.appliedDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
