import HeroSection from "../components/HeroSection";
import StatCard from "../components/StatCard";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Claims Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-teal-50 rounded-lg">
              <div className="text-4xl mb-4">�️</div>
              <h3 className="text-xl font-semibold mb-2">Interactive Mapping</h3>
              <p className="text-gray-600">
                Visualize forest rights claims across India with our interactive mapping
                tools.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Track claim status and receive notifications about important updates.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Leverage artificial intelligence for better decision-making and trend
                analysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
