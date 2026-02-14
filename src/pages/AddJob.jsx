// src/pages/AddJob.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveJob } from "../utils/storage";

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      alert("Company and Role are required!");
      return;
    }

    setLoading(true);

    try {
      const appliedDateObj = new Date(formData.appliedDate);
      const followUpDaysNum = Number(formData.followUpDays);

      const followUpDateObj = new Date(appliedDateObj);
      followUpDateObj.setDate(appliedDateObj.getDate() + followUpDaysNum);

      const job = {
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

      await saveJob(job);

      navigate("/jobs");
    } catch (error) {
      console.log(error);
      alert("Something went wrong while saving job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white border shadow-sm rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Add Job Application
        </h2>
        <p className="text-gray-600 mb-6">
          Save your job applications in Firebase.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Eg: HR contacted me..."
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
