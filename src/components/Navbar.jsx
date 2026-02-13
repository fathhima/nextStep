import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">NextStep</h1>

        <div className="flex gap-2">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/jobs" className={linkClass}>
            Jobs
          </NavLink>

          <NavLink to="/add" className={linkClass}>
            Add Job
          </NavLink>
        </div>
      </div>
    </nav>
  );
}