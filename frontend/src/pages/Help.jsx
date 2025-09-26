export default function Help() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Help centre</h1>
      <p className="mt-4 text-slate-600">
        Browse frequently asked questions and guidance on how to submit claims, digitise documentation, and follow progress updates. Detailed help content will be connected to the knowledge base once available.
      </p>
      <div className="mt-8 space-y-6">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">How do I submit a claim?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Navigate to the New Claim page, provide a clear title, description, and location. Attach digitised documents when available, then submit for review.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">What is the review process?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Claims move through submission, review, and approval or rejection. Each status change appears in the Status page with contextual notes.
          </p>
        </article>
      </div>
    </section>
  );
}
