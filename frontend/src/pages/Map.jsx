import React, { useState } from "react";

export default function Map() {
  const [filters, setFilters] = useState({
    state: "all",
    district: "all",
    claimType: "all",
    dateRange: "all",
    status: "all",
    area: "all"
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      state: "all",
      district: "all",
      claimType: "all",
      dateRange: "all",
      status: "all",
      area: "all"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white shadow-sm border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Forest Rights Claims Map</h1>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Filters */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              <button 
                onClick={handleReset}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset all
              </button>
            </div>

            {/* State Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All States</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="madhyaPradesh">Madhya Pradesh</option>
                <option value="chhattisgarh">Chhattisgarh</option>
                <option value="odisha">Odisha</option>
              </select>
            </div>

            {/* District Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <select
                name="district"
                value={filters.district}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Districts</option>
                <option value="gadchiroli">Gadchiroli</option>
                <option value="chandrapur">Chandrapur</option>
                <option value="gondia">Gondia</option>
              </select>
            </div>

            {/* Claim Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claim Type
              </label>
              <select
                name="claimType"
                value={filters.claimType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="community">Community</option>
                <option value="habitat">Habitat</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="lastYear">Last Year</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="appeal">Under Appeal</option>
              </select>
            </div>

            {/* Area Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area Range (Hectares)
              </label>
              <select
                name="area"
                value={filters.area}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (0-2)</option>
                <option value="medium">Medium (2-5)</option>
                <option value="large">Large (5+)</option>
              </select>
            </div>

            <button
              onClick={() => console.log("Applying filters:", filters)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Right Side - Map Area */}
        <div className="flex-1 bg-gray-100 p-6">
          <div className="bg-white h-full rounded-lg shadow-sm border flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg 
                className="w-16 h-16 mb-4 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <p className="text-xl font-medium mb-2">Map Placeholder</p>
              <p className="text-sm">The interactive map will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}