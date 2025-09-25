export default function StatCard({ icon, number, label, trend, trendDirection }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="text-3xl mb-4">{icon}</div>
        {trend && (
          <div className={`text-sm font-semibold ${trendDirection === "up" ? "text-green-500" : "text-red-500"}`}>
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{number.toLocaleString()}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
