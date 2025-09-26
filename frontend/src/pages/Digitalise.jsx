import { useState } from "react";

const STEPS = [
  {
    title: "Upload documentation",
    description: "Provide PDFs, scanned images, or satellite layers to digitise.",
  },
  {
    title: "Auto-extract key details",
    description: "Optical character recognition (OCR) parses text and metadata for faster review.",
  },
  {
    title: "Verify before submission",
    description: "Confirm extracted details before attaching them to a claim.",
  },
];

export default function Digitalise() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files || []));
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Digitalise documentation</h1>
        <p className="text-slate-600 mt-2">
          Convert paper-based or scanned evidence into structured data ready for claim submission.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Upload centre</h2>
          <p className="text-sm text-slate-500 mt-1">
            Supported formats: PDF, JPG, PNG, GeoTIFF (coming soon).
          </p>
          <label className="mt-4 flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 text-sm text-slate-500 hover:border-teal-500 hover:text-teal-600">
            <span>Select files to upload</span>
            <input type="file" multiple onChange={handleFileChange} className="hidden" />
          </label>
          {selectedFiles.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {selectedFiles.map((file) => (
                <li key={file.name} className="flex items-center justify-between rounded-md bg-slate-100 px-3 py-2">
                  <span>{file.name}</span>
                  <span className="text-xs text-slate-500">{Math.round(file.size / 1024)} KB</span>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-white font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            disabled
          >
            Start digitising (coming soon)
          </button>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-medium text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
