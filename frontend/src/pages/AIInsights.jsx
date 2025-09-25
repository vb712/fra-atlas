export default function AIInsights() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Insights</h1>
        <p className="text-gray-600">
          Artificial Intelligence powered analysis and predictions for Forest Rights Claims
        </p>
      </div>

      {/* AI Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h2 className="text-xl font-semibold">Claim Success Prediction</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Claim #FRA2024005</span>
                <span className="text-green-600 font-semibold">85% Success</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                High likelihood of approval based on documentation completeness and similar approved cases.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Claim #FRA2024006</span>
                <span className="text-yellow-600 font-semibold">45% Success</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Additional documentation recommended to improve approval chances.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <span className="text-2xl">📈</span>
            </div>
            <h2 className="text-xl font-semibold">Trend Analysis</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Key Insights</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">↗</span>
                  20% increase in approval rate in tribal areas
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">→</span>
                  Stable processing time of 45 days on average
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">!</span>
                  High claim volume expected in next 3 months
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Process Optimization</h3>
            <p className="text-green-600">
              Implement mobile documentation collection to reduce processing time by 30%.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Resource Allocation</h3>
            <p className="text-blue-600">
              Increase field verification teams in high-volume districts.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Documentation</h3>
            <p className="text-purple-600">
              Enhance GPS mapping accuracy for better land verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
