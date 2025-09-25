import React, { useState, Suspense } from "react";
const MapComponent = React.lazy(() => import("../components/MapComponent"));

export default function Map() {
  const [filters, setFilters] = useState({
    region: "all",
    claimType: "all",
    status: "all",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Implement filter logic here
    console.log("Applied filters:", filters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Interactive Map</h1>
        <p className="text-gray-600">
          Explore forest rights claims across different regions of India
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            {/* Region Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select 
                name="region"
                value={filters.region}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="all">All Regions</option>
                <option value="north">North India</option>
                <option value="south">South India</option>
                <option value="east">East India</option>
                <option value="west">West India</option>
                <option value="central">Central India</option>
              </select>
            </div>

            {/* Claim Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Claim Type
              </label>
              <select
                name="claimType"
                value={filters.claimType}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="all">All Claims</option>
                <option value="individual">Individual Claims</option>
                <option value="community">Community Claims</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 bg-white"
              />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
            </div>

            <button 
              onClick={handleApplyFilters}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
            >
              Apply Filters
            </button>
          </div>

          {/* Legend */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Legend</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Approved Claims</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                <span>Pending Claims</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Rejected Claims</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3">
          <Suspense fallback={
            <div className="h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
              <div className="text-gray-600">
                <svg className="animate-spin h-8 w-8 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Loading map...</p>
              </div>
            </div>
          }>
            <MapComponent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
