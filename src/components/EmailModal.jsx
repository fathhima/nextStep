// src/components/EmailModal.jsx

import { useState } from "react";

export default function EmailModal({ isOpen, onClose, job }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !job) return null;

  const subject = `Follow-up on my application for ${job.role} at ${job.company}`;

  const body = `Hi Hiring Team,

I hope you are doing well.

I applied for the ${job.role} position at ${job.company} on ${job.appliedDate}. I wanted to follow up and check if there is any update regarding my application status.

I am very interested in this opportunity and would love to know the next steps in the process.

Thank you for your time and consideration.

Best regards,
[Your Name]`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert("Failed to copy. Please copy manually.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Follow-up Email Template
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Copy and send this email to follow up.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Subject
          </label>
          <div className="bg-gray-50 border rounded-xl px-4 py-3 text-gray-800 text-sm">
            {subject}
          </div>
        </div>

        {/* Body */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Body
          </label>
          <pre className="bg-gray-50 border rounded-xl px-4 py-3 text-gray-800 text-sm whitespace-pre-wrap font-sans leading-relaxed">
            {body}
          </pre>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {copied ? "Copied ✅" : "Copy to Clipboard"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-800 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
