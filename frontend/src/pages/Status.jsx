import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const FALLBACK_CLAIMS = [
  {
    id: 1,
    claimNumber: "CLM-0001",
    title: "Satellite imagery damage assessment",
    status: "review",
    updatedAt: "2025-09-20",
  },
  {
    id: 2,
    claimNumber: "CLM-0002",
    title: "Forest degradation verification",
    status: "submitted",
    updatedAt: "2025-09-19",
  },
];

const STATUS_BADGES = {
  submitted: "bg-blue-100 text-blue-800",
  review: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

export default function Status() {
  const { token } = useAuth();
  const [claims, setClaims] = useState(FALLBACK_CLAIMS);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      const baseUrl = import.meta.env.VITE_API_URL;
      if (!baseUrl || !token) {
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/claims`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || "Unable to load claims");
        }

        const data = await response.json();
        setClaims(data.claims || []);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    };

    fetchClaims();
  }, [token]);

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Claim status</h1>
        <p className="text-slate-600 mt-2">
          Track the progress of your submitted claims. Status updates arrive in real-time once the workflow is connected to the backend.
        </p>
      </header>

      {error && <p className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="space-y-4">
        {claims.map((claim) => (
          <article key={claim.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{claim.title}</h2>
                <p className="text-sm text-slate-500">{claim.claimNumber}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${STATUS_BADGES[claim.status] || "bg-slate-100 text-slate-700"}`}
              >
                {claim.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Last updated: {claim.updatedAt || "Pending"}
            </p>
          </article>
        ))}

        {claims.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No claims found. Submit your first claim to start tracking progress.
          </div>
        )}
      </div>
    </section>
  );
}
