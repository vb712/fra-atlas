const statusClasses = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
  appeal: "bg-purple-100 text-purple-800",
};

const severityClasses = {
  critical: "bg-rose-100 text-rose-800",
  warning: "bg-amber-100 text-amber-800",
  info: "bg-sky-100 text-sky-800",
};

const FALLBACK = "-";

const toTitleCase = (value) => {
  if (!value) return FALLBACK;
  return value
    .toString()
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatArea = (hectares) =>
  Number.isFinite(hectares) ? hectares.toFixed(1) : FALLBACK;

const formatDate = (input) => {
  if (!input) return FALLBACK;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime())
    ? FALLBACK
    : parsed.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const renderFlags = (flags, claimId) => {
  if (!Array.isArray(flags) || flags.length === 0) return "None";
  return (
    <div className="space-y-1">
      {flags.map((flag) => {
        const badgeClass = severityClasses[flag.severity] || "bg-slate-100 text-slate-800";
        const label = flag.message || toTitleCase(flag.code);
        return (
          <span
            key={`${claimId}-${flag.code}`}
            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
};

export default function ClaimTable({ claims }) {
  const hasClaims = Array.isArray(claims) && claims.length > 0;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            {[
              "Claim ID",
              "Village",
              "District",
              "State",
              "Claim Type",
              "Status",
              "Area (ha)",
              "Households",
              "Submitted",
              "Flags",
            ].map((heading) => (
              <th
                key={heading}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {!hasClaims ? (
            <tr>
              <td colSpan={10} className="px-6 py-6 text-center text-sm text-gray-500">
                No claims to display.
              </td>
            </tr>
          ) : (
            claims.map((claim) => {
              const statusKey = claim.status?.toLowerCase?.();
              const badgeClass = statusClasses[statusKey] || "bg-slate-100 text-slate-800";
              const badgeLabel =
                statusKey?.charAt(0).toUpperCase() + statusKey?.slice(1) || "Unknown";
              const needsAttention = statusKey === "approved" && Array.isArray(claim.flags) && claim.flags.length > 0;

              return (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {claim.id || FALLBACK}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.village || FALLBACK}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {toTitleCase(claim.district)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {toTitleCase(claim.state)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {toTitleCase(claim.claimType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}
                      >
                        {badgeLabel}
                      </span>
                      {needsAttention ? (
                        <div className="relative group">
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold animate-pulse group-hover:animate-none"
                          >
                            !
                          </span>
                          <span
                            className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-amber-600 px-3 py-1 text-xs font-semibold text-white shadow-lg opacity-0 transition duration-200 group-hover:block group-hover:translate-y-0 group-hover:opacity-100"
                          >
                            Needs immediate attention
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatArea(claim.areaHectares)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Number.isFinite(claim.households) ? claim.households : FALLBACK}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(claim.submissionDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {renderFlags(claim.flags, claim.id)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
