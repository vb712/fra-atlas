import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import StatCard from "../components/StatCard";

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Claims Filed',
      data: [65, 59, 80, 81, 56, 90],
      backgroundColor: 'rgba(45, 166, 178, 0.5)',
      borderColor: 'rgb(45, 166, 178)',
      borderWidth: 1,
    },
  ],
};

const trendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Approved Claims',
      data: [30, 35, 40, 45, 50, 55],
      borderColor: 'rgb(34, 197, 94)',
      tension: 0.4,
    },
    {
      label: 'Pending Claims',
      data: [25, 20, 30, 25, 20, 15],
      borderColor: 'rgb(234, 179, 8)',
      tension: 0.4,
    },
    {
      label: 'Rejected Claims',
      data: [10, 15, 10, 12, 8, 5],
      borderColor: 'rgb(239, 68, 68)',
      tension: 0.4,
    },
  ],
};

const stats = [
  {
    icon: "📊",
    number: 15847,
    label: "Total Claims",
    trend: "+12%",
    trendDirection: "up",
  },
  {
    icon: "✅",
    number: 8923,
    label: "Approved",
    trend: "+8%",
    trendDirection: "up",
  },
  {
    icon: "⏳",
    number: 4721,
    label: "Pending",
    trend: "-15%",
    trendDirection: "down",
  },
  {
    icon: "❌",
    number: 2203,
    label: "Rejected",
    trend: "+3%",
    trendDirection: "up",
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600">
          Overview of Forest Rights Act claims and statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Claims Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Claims</h2>
          <BarChart 
            data={monthlyData} 
            options={{
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>

        {/* Claims Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Claims Trend</h2>
          <LineChart 
            data={trendData}
            options={{
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-gray-800">Claim #FRA2024001 was approved</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600">+</span>
                </div>
                <div>
                  <p className="text-gray-800">New claim submitted in Ranchi district</p>
                  <p className="text-sm text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <span className="text-yellow-600">⟳</span>
                </div>
                <div>
                  <p className="text-gray-800">Claim #FRA2024002 under review</p>
                  <p className="text-sm text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
