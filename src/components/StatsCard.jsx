// src/components/StatsCard.jsx

export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="bg-white border shadow-sm rounded-2xl p-6">
      <p className="text-sm font-medium text-gray-600">{title}</p>

      <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2 leading-snug">{subtitle}</p>
      )}
    </div>
  );
}
