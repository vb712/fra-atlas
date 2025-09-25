import ClaimTable from "../components/ClaimTable";

const recentClaims = [
  {
    id: "FRA2024001",
    claimantName: "Ramesh Kumar",
    location: "Jharkhand, Ranchi",
    area: 2.5,
    status: "Pending",
    dateSubmitted: "2024-09-15",
    remarks: "Documents under review"
  },
  {
    id: "FRA2024002", 
    claimantName: "Sunita Devi",
    location: "Odisha, Koraput",
    area: 1.8,
    status: "Approved",
    dateSubmitted: "2024-09-10",
    remarks: "All documents verified"
  },
  {
    id: "FRA2024003",
    claimantName: "Arjun Singh",
    location: "Madhya Pradesh, Balaghat",
    area: 3.2,
    status: "Rejected",
    dateSubmitted: "2024-09-08",
    remarks: "Insufficient evidence"
  },
  {
    id: "FRA2024004",
    claimantName: "Meera Tribal",
    location: "Chhattisgarh, Dantewada",
    area: 1.9,
    status: "Approved",
    dateSubmitted: "2024-09-12",
    remarks: "Community forest rights approved"
  }
];

export default function Claims() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Forest Rights Claims</h1>
            <p className="text-gray-600">
              Manage and track forest rights claims across different regions
            </p>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg">
            + New Claim
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">All Regions</option>
              <option value="jharkhand">Jharkhand</option>
              <option value="odisha">Odisha</option>
              <option value="madhya-pradesh">Madhya Pradesh</option>
              <option value="chhattisgarh">Chhattisgarh</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <ClaimTable claims={recentClaims} />
      </div>
    </div>
  );
}
