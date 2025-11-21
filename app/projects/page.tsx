"use client";

import { useEffect, useState } from "react";

type Project = {
  project_id: string;
  name: string;
  jurisdiction: string;
  category: string;
  issuer: string;
  status: string;
  announcement_date?: string;
  url?: string;
  description?: string;
};


const JURISDICTION_OPTIONS = [
  "All",
  "Hong Kong",
  "Singapore",
  "EU",
  "UAE",
  "Switzerland",
  "Other"
];

const CATEGORY_OPTIONS = [
  "All",
  "Tokenised Government Bond",
  "Tokenised Fund",
  "Stablecoin",
  "Real Estate",
  "Other"
];

const STATUS_OPTIONS = ["All", "Live", "Pilot", "Completed", "Announced"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [jurisdiction, setJurisdiction] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (jurisdiction !== "All") {
        params.append("jurisdiction", jurisdiction);
      }
      if (category !== "All") {
        params.append("category", category);
      }
      if (status !== "All") {
        params.append("status", status);
      }

      let url = "/api/projects";
      const query = params.toString();
      if (query) {
        url += `?${query}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-slate-100 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">RWA Project Registry</h1>
      <p className="text-slate-400 text-sm mb-6">
        Filter by jurisdiction, category, and status. Data served from the public
        <code className="ml-1 bg-slate-900 px-1.5 py-0.5 rounded text-xs border border-slate-700">
          /api/projects
        </code>{" "}
        endpoint.
      </p>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-4 items-end">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Jurisdiction
          </label>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          >
            {JURISDICTION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex md:justify-end">
          <button
            type="button"
            onClick={fetchProjects}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-slate-400 text-sm">Loading projects...</p>
      )}

      {error && !loading && (
        <p className="text-red-400 text-sm mb-4">Error: {error}</p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-slate-400 text-sm">No projects found.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-800/60 mt-4">
          <table className="w-full text-sm">
          <thead className="bg-slate-900/60 border-b border-slate-800/60">
  <tr>
    <th className="px-4 py-3 text-left">Project</th>
    <th className="px-4 py-3 text-left">Jurisdiction</th>
    <th className="px-4 py-3 text-left">Category</th>
    <th className="px-4 py-3 text-left">Issuer</th>
    <th className="px-4 py-3 text-left">Status</th>
    <th className="px-4 py-3 text-left">Announcement Date</th>
  </tr>
</thead>

            <tbody>
              {projects.map((p) => (
                <tr
                key={p.project_id}
                className="border-b border-slate-800/40 hover:bg-slate-900/40 cursor-pointer"
              >
                <td className="px-4 py-3 font-medium">
                  <a
  href={p.url || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="text-cyan-400 hover:underline"
>
  {p.name}
</a>

              
                  {/* Description under name */}
                  {p.description && (
                    <p className="text-slate-400 text-xs mt-1 max-w-xl leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </td>
              
                <td className="px-4 py-3">{p.jurisdiction}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">{p.issuer}</td>
                <td className="px-4 py-3">{p.status}</td>
                <td className="px-4 py-3">{p.announcement_date || "-"}</td>
              </tr>
              
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
