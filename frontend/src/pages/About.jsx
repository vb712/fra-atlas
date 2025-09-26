export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">About FRA Atlas</h1>
      <p className="mt-4 text-slate-600">
        FRA Atlas empowers field teams and administrators to monitor forest-related claims with geospatial context, AI-supported insights, and streamlined workflows.
      </p>
      <div className="mt-8 space-y-6">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Our mission</h2>
          <p className="mt-2 text-sm text-slate-600">
            Provide transparent, data-driven tooling to accelerate climate resilience and forest restoration programmes around the world.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Key features</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Interactive map overlays with satellite and ground data.</li>
            <li>Claim lifecycle management with audit-ready history.</li>
            <li>AI insights to prioritise high-impact interventions.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
