// src/pages/AddJob.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs, saveJobs } from "../utils/storage";

export default function AddJob() {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    link: "",
    appliedDate: today,
    followUpDays: "3",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      alert("Company and Role are required!");
      return;
    }

    const appliedDateObj = new Date(formData.appliedDate);
    const followUpDaysNum = Number(formData.followUpDays);

    const followUpDateObj = new Date(appliedDateObj);
    followUpDateObj.setDate(appliedDateObj.getDate() + followUpDaysNum);

    const job = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      company: formData.company.trim(),
      role: formData.role.trim(),
      link: formData.link.trim(),
      appliedDate: formData.appliedDate,
      followUpDays: followUpDaysNum,
      followUpDate: followUpDateObj.toISOString().split("T")[0],
      notes: formData.notes.trim(),
      status: "Applied",
      createdAt: new Date().toISOString(),
    };

    const existingJobs = getJobs();
    const updatedJobs = [job, ...existingJobs];

    saveJobs(updatedJobs);

    navigate("/jobs");
  };

  return (
    <div className="min-h-[80vh] flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white border shadow-sm rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Add Job Application
        </h2>
        <p className="text-gray-600 mb-6">
          Track your job applications and follow-up dates easily.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Eg: Google"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Eg: Frontend Developer"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Link (optional)
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://company.com/job-post"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Applied Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applied Date
            </label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Follow Up Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Follow-up Reminder
            </label>
            <select
              name="followUpDays"
              value={formData.followUpDays}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3">3 days</option>
              <option value="5">5 days</option>
              <option value="7">7 days</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Eg: HR contacted me, asked for resume..."
              rows="4"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Save Job
            </button>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="w-full sm:w-auto flex-1 bg-gray-100 text-gray-800 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
