import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function NewClaim() {
  const { token } = useAuth();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    severity: "medium",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetStatus = () => setStatus({ type: "idle", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetStatus();

    const baseUrl = import.meta.env.VITE_API_URL;

    try {
      if (baseUrl && token) {
        const response = await fetch(`${baseUrl}/claims`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || "Unable to submit claim");
        }
      }

      setStatus({ type: "success", message: "Claim submitted successfully" });
      setFormState({ title: "", description: "", location: "", severity: "medium" });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit claim" });
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Submit a new claim</h1>
        <p className="text-slate-600 mt-2">
          Provide as much detail as possible to help the review team evaluate your submission quickly.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="title">
            Claim title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formState.title}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows="4"
            value={formState.description}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="location">
              Location reference
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Latitude, Longitude or address"
              value={formState.location}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="severity">
              Severity
            </label>
            <select
              id="severity"
              name="severity"
              value={formState.severity}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Document uploads will be available once storage integration is configured.
        </div>
        {status.type === "success" && (
          <p className="text-sm text-teal-600">{status.message}</p>
        )}
        {status.type === "error" && <p className="text-sm text-red-600">{status.message}</p>}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-white font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Submit claim
        </button>
      </form>
    </section>
  );
}
