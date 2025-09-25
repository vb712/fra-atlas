export default function Reports() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Reports</h1>
        <p className="text-gray-600">
          Generate and download detailed reports on Forest Rights Act claims
        </p>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-xl font-semibold">Claims Summary</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Comprehensive overview of all claims with status breakdown and processing times.
          </p>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Generate PDF
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <span className="text-2xl">📈</span>
            </div>
            <h2 className="text-xl font-semibold">Monthly Analytics</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Monthly trends, approval rates, and processing efficiency metrics.
          </p>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Generate PDF
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <h2 className="text-xl font-semibold">Geographic Distribution</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Region-wise claim distribution and status analysis with maps.
          </p>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Generate PDF
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Custom Report Builder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Select Report Type</option>
              <option value="claims">Claims Analysis</option>
              <option value="performance">Performance Metrics</option>
              <option value="geographic">Geographic Analysis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Select Date Range</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Format
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Select Format</option>
              <option value="pdf">PDF Report</option>
              <option value="csv">CSV Export</option>
              <option value="excel">Excel Workbook</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg">
            Generate Custom Report
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Monthly Claims Summary
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Sep 24, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    PDF
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-teal-600 hover:text-teal-900">
                    Download
                  </a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Geographic Analysis
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Sep 23, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Excel
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-teal-600 hover:text-teal-900">
                    Download
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
