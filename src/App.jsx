import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Addjob from "./pages/Addjob";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/add" element={<Addjob />} />

          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-red-600">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 mt-2">
                  The page you are looking for doesn't exist.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
