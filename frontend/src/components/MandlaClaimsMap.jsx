import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import distance from "@turf/distance";
import { point } from "@turf/helpers";

const GEOJSON_URL = "/data/mandla.geojson";
const CLAIMS_URL = "/data/mandla-claims.json";
const NEARBY_THRESHOLD_KM = 0.3;
const DISTANCE_OPTIONS = { units: "kilometers" };
const FLAG_OUTSIDE = "OUTSIDE_BOUNDARY";

const statusColor = {
  approved: "#16a34a",
  pending: "#f97316",
  rejected: "#dc2626",
  appeal: "#7c3aed",
};

const getAreaBucket = (hectares) => {
  if (hectares <= 2) return "small";
  if (hectares <= 5) return "medium";
  return "large";
};

const getDateCutoff = (range) => {
  const today = new Date();
  switch (range) {
    case "last30":
      return new Date(today.setDate(today.getDate() - 30));
    case "last90":
      return new Date(today.setDate(today.getDate() - 90));
    case "lastYear":
      return new Date(today.setFullYear(today.getFullYear() - 1));
    default:
      return null;
  }
};

const applyFilters = (claims, filters) => {
  if (!filters) return claims;
  const cutoff = getDateCutoff(filters.dateRange);
  return claims.filter((claim) => {
    if (filters.state !== "all" && claim.state !== filters.state) return false;
    if (filters.district !== "all" && claim.district !== filters.district) return false;
    if (filters.claimType !== "all" && claim.claimType !== filters.claimType) return false;
    if (filters.status !== "all" && claim.status !== filters.status) return false;
    if (filters.area !== "all" && getAreaBucket(claim.areaHectares) !== filters.area) return false;
    if (
      (filters.state !== "all" || filters.district !== "all") &&
      claim.flags?.some((flag) => flag.code === FLAG_OUTSIDE)
    ) {
      return false;
    }
    if (cutoff) {
      const submission = new Date(claim.submissionDate);
      if (submission < cutoff) return false;
    }
    return true;
  });
};

const aggregateClaims = (claims) =>
  claims.reduce(
    (acc, claim) => {
      acc.totalClaims += 1;
      acc.totalArea += claim.areaHectares;
      acc.households += claim.households ?? 0;
      if (claim.status === "approved") acc.approved += 1;
      return acc;
    },
    { totalClaims: 0, approved: 0, totalArea: 0, households: 0 }
  );

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
        } catch {
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
      } catch {
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

const MandlaClaimsMap = ({ filters }) => {
  const [boundary, setBoundary] = useState(null);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(GEOJSON_URL).then((res) => res.json()),
      fetch(CLAIMS_URL).then((res) => res.json()),
    ])
      .then(([geojson, claimList]) => {
        setBoundary(geojson);
        setClaims(Array.isArray(claimList) ? claimList : []);
      })
      .catch((error) => {
        console.error("Failed to load Mandla map data", error);
      });
  }, []);

  const annotatedClaims = useMemo(
    () => annotateClaims(claims, boundary),
    [claims, boundary]
  );

  const filteredClaims = useMemo(
    () => applyFilters(annotatedClaims, filters),
    [annotatedClaims, filters]
  );

  const totals = useMemo(
    () => aggregateClaims(filteredClaims),
    [filteredClaims]
  );

  const mapCenter = useMemo(() => {
    if (!filteredClaims.length) return [22.6, 80.37];
    const latSum = filteredClaims.reduce((sum, claim) => sum + claim.latitude, 0);
    const lonSum = filteredClaims.reduce((sum, claim) => sum + claim.longitude, 0);
    return [latSum / filteredClaims.length, lonSum / filteredClaims.length];
  }, [filteredClaims]);

  const geoJsonStyle = useMemo(() => {
    const intensity = Math.min(0.6, totals.totalClaims / 150 || 0);
    return () => ({
      weight: 1.2,
      color: "#1d4ed8",
      fillColor: "#3b82f6",
      fillOpacity: 0.2 + intensity,
    });
  }, [totals]);

  const onEachFeature = useCallback(
    (feature, layer) => {
      const name = feature?.properties?.label || feature?.properties?.NAME_2 || "Mandla";
      const approvalRate = totals.totalClaims
        ? ((totals.approved / totals.totalClaims) * 100).toFixed(1)
        : "0.0";
      const tooltip = `
        <strong>${name}</strong><br />
        Claims: ${totals.totalClaims}<br />
        Approved: ${totals.approved}<br />
        Approval rate: ${approvalRate}%<br />
        Area under claims: ${totals.totalArea.toFixed(1)} ha
      `;
      layer.bindTooltip(tooltip, { sticky: true });
    },
    [totals]
  );

  if (!boundary) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Loading map data...
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={8}
      minZoom={6}
      maxZoom={14}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
      key={`${filteredClaims.length}-${totals.totalClaims}-${totals.approved}`}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={boundary} style={geoJsonStyle} onEachFeature={onEachFeature} />
      {filteredClaims.map((claim) => {
        const color = statusColor[claim.status] || "#0f172a";
        const hasFlags = claim.flags?.length;
        const radius = Math.max(6, Math.sqrt(claim.areaHectares) * 3) + (hasFlags ? 2 : 0);
        const borderColor = hasFlags ? "#f97316" : color;
        return (
          <CircleMarker
            key={claim.id}
            center={[claim.latitude, claim.longitude]}
            radius={radius}
            pathOptions={{
              color: borderColor,
              fillColor: color,
              fillOpacity: hasFlags ? 0.6 : 0.45,
              weight: hasFlags ? 2 : 1,
              dashArray: hasFlags ? "4 2" : undefined,
            }}
          >
            <Tooltip direction="top" offset={[0, -4]}>
              <div className="text-xs">
                <strong>{claim.village}</strong>
                <br />Type: {claim.claimType}
                <br />Status: {claim.status}
                <br />Area: {claim.areaHectares.toFixed(1)} ha
                <br />Households: {claim.households}
                <br />Filed: {claim.submissionDate}
                {claim.flags?.length ? (
                  <div className="mt-1 text-red-600">
                    <strong>Flags:</strong>
                    {claim.flags.map((flag) => (
                      <div key={`${claim.id}-${flag.code}`}>{flag.message}</div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default MandlaClaimsMap;
