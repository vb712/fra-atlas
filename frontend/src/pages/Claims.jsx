import { useEffect, useMemo, useState } from "react";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import distance from "@turf/distance";
import { point } from "@turf/helpers";
import ClaimTable from "../components/ClaimTable";

const CLAIMS_URL = "/data/mandla-claims.json";
const GEOJSON_URL = "/data/mandla.geojson";
const NEARBY_THRESHOLD_KM = 0.3;
const DISTANCE_OPTIONS = { units: "kilometers" };
const FLAG_OUTSIDE = "OUTSIDE_BOUNDARY";

const sanitizeBoundaryFeatures = (boundary) => {
  if (!boundary?.features) return [];
  return boundary.features.filter((feature) => {
    const geometryType = feature?.geometry?.type;
    return geometryType === "Polygon" || geometryType === "MultiPolygon";
  });
};

const formatDistance = (kilometers) => {
  if (!Number.isFinite(kilometers)) return null;
  const meters = Math.round(kilometers * 1000);
  if (meters < 1) return "<1 m";
  if (meters < 1000) return `${meters} m`;
  return `${kilometers.toFixed(1)} km`;
};

const annotateClaims = (claims, boundary) => {
  if (!Array.isArray(claims) || !claims.length) return [];
  const boundaryFeatures = sanitizeBoundaryFeatures(boundary);
  const turfPoints = claims.map((claim) =>
    Number.isFinite(claim.longitude) && Number.isFinite(claim.latitude)
      ? point([claim.longitude, claim.latitude], { id: claim.id })
      : null
  );

  return claims.map((claim, index) => {
    const flags = [];
    const claimPoint = turfPoints[index];

    if (!claimPoint) {
      flags.push({
        code: "INVALID_COORDINATES",
        severity: "critical",
        message: "Missing or invalid latitude/longitude values.",
      });
      return {
        ...claim,
        flags,
        nearestNeighborKm: null,
      };
    }

    if (
      boundaryFeatures.length > 0 &&
      !boundaryFeatures.some((feature) => {
        try {
          return booleanPointInPolygon(claimPoint, feature);
        } catch (error) {
          return false;
        }
      })
    ) {
      flags.push({
        code: FLAG_OUTSIDE,
        severity: "critical",
        message: "Location lies outside the Mandla district boundary.",
      });
    }

    let nearestNeighborKm = null;
    let minDistance = Infinity;

    for (let i = 0; i < turfPoints.length; i += 1) {
      if (i === index) continue;
      const neighborPoint = turfPoints[i];
      if (!neighborPoint) continue;
      try {
        const km = distance(claimPoint, neighborPoint, DISTANCE_OPTIONS);
        if (km < minDistance) {
          minDistance = km;
        }
      } catch (error) {
        // ignore distance failures for malformed points
      }
    }

    if (Number.isFinite(minDistance)) {
      nearestNeighborKm = minDistance;
      if (minDistance < NEARBY_THRESHOLD_KM) {
        const proximityLabel = formatDistance(minDistance);
        flags.push({
          code: "CLOSE_PROXIMITY",
          severity: "warning",
          message: proximityLabel
            ? `Another claim is within ${proximityLabel}.`
            : "Another claim is extremely close by.",
        });
      }
    }

    return {
      ...claim,
      flags,
      nearestNeighborKm,
    };
  });
};

const sortClaimsByDateDesc = (claims) => {
  return [...claims].sort((a, b) => {
    const left = new Date(a.submissionDate).getTime();
    const right = new Date(b.submissionDate).getTime();
    if (Number.isNaN(left) && Number.isNaN(right)) return 0;
    if (Number.isNaN(left)) return 1;
    if (Number.isNaN(right)) return -1;
    return right - left;
  });
};

const filterClaims = (claims, filters) => {
  if (!Array.isArray(claims) || !claims.length) return [];
  const sinceDate = filters.sinceDate ? new Date(filters.sinceDate) : null;
  const hasSince = sinceDate && !Number.isNaN(sinceDate.getTime());

  return claims.filter((claim) => {
    if (filters.status !== "all" && claim.status !== filters.status) return false;
    if (filters.state !== "all" && claim.state !== filters.state) return false;
    if (hasSince) {
      const submitted = new Date(claim.submissionDate);
      if (Number.isNaN(submitted.getTime()) || submitted < sinceDate) return false;
    }
    return true;
  });
};

const toTitleCase = (value) => {
  if (!value) return "-";
  return value
    .toString()
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const uniqueValues = (claims, key) => {
  const seen = new Set();
  claims.forEach((claim) => {
    const value = claim[key];
    if (value) seen.add(value);
  });
  return Array.from(seen).sort();
};

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: "all", state: "all", sinceDate: "" });

  useEffect(() => {
    let isMounted = true;

    const loadClaims = async () => {
      setLoading(true);
      setError(null);
      try {
        const [boundary, rawClaims] = await Promise.all([
          fetchJson(GEOJSON_URL),
          fetchJson(CLAIMS_URL),
        ]);
        if (!isMounted) return;

        const list = Array.isArray(rawClaims) ? rawClaims : [];
        const annotated = annotateClaims(list, boundary);
        const sorted = sortClaimsByDateDesc(annotated);
        setClaims(sorted);
      } catch (err) {
        if (isMounted) setError("Unable to load Mandla claims.");
        console.error("Failed to load claims:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadClaims();
    return () => {
      isMounted = false;
    };
  }, []);

  const statusOptions = useMemo(() => uniqueValues(claims, "status"), [claims]);
  const stateOptions = useMemo(() => uniqueValues(claims, "state"), [claims]);
  const filteredClaims = useMemo(() => filterClaims(claims, filters), [claims, filters]);

  const handleStatusChange = (event) => {
    setFilters((prev) => ({ ...prev, status: event.target.value }));
  };

  const handleStateChange = (event) => {
    setFilters((prev) => ({ ...prev, state: event.target.value }));
  };

  const handleSinceDateChange = (event) => {
    setFilters((prev) => ({ ...prev, sinceDate: event.target.value }));
  };

  const resetFilters = () => {
    setFilters({ status: "all", state: "all", sinceDate: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Forest Rights Claims</h1>
            <p className="text-gray-600">Manage and track forest rights claims across different regions</p>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg">
            + New Claim
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={handleStatusChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {toTitleCase(status)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              value={filters.state}
              onChange={handleStateChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All states</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {toTitleCase(state)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Submitted since</label>
            <input
              type="date"
              value={filters.sinceDate}
              onChange={handleSinceDateChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {error ? (
          <div className="px-6 py-8 text-center text-sm text-red-600">{error}</div>
        ) : loading ? (
          <div className="px-6 py-8 text-center text-sm text-gray-500">Loading Mandla claims...</div>
        ) : (
          <ClaimTable claims={filteredClaims} />
        )}
      </div>
    </div>
  );
}
