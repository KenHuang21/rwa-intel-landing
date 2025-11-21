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
  "Other",
];

const CATEGORY_OPTIONS = [
  "All",
  "Tokenised Bonds",
  "Tokenised Securities Infrastructure",
  "Digital Securities Licensing",
  "Misc Regulatory",
  "Stablecoin",
  "Real Estate",
  "Other",
];

const STATUS_OPTIONS = ["All", "Live", "Pilot", "Completed", "Announced"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [jurisdiction, setJurisdiction] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (jurisdiction !== "All") params.append("jurisdiction", jurisdiction);
      if (category !== "All") params.append("category", category);
      if (status !== "All") params.append("status", status);

      let url = "/api/projects";
      const query = params.toString();
      if (query) url += `?${query}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

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

  const sortedProjects = [...projects].sort((a, b) => {
    const da = new Date(a.announcement_date || 0).getTime();
    const db = new Date(b.announcement_date || 0).getTime();
    return sortDir === "asc" ? da - db : db - da;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Title + subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
  RWA Project Registry
</h1>
        <p className="mt-2 text-sm text-slate-400">
          Filter by jurisdiction, category, and status. Data served from the
          public
          <code className="ml-1 rounded bg-slate-900 px-1.5 py-0.5 text-xs text-slate-100 border border-slate-700">
            /api/projects
          </code>{" "}
          endpoint.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-4 items-end">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">
            Jurisdiction
          </label>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          >
            {JURISDICTION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
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
            className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-cyan-400 transition-colors md:w-auto"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-sm text-slate-400">Loading projects...</p>
      )}

      {error && !loading && (
        <p className="mb-4 text-sm text-red-400">Error: {error}</p>
      )}

      {!loading && !error && sortedProjects.length === 0 && (
        <p className="text-sm text-slate-400">No projects found.</p>
      )}

      {/* Table */}
      {!loading && !error && sortedProjects.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-950/95 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Jurisdiction
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Issuer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400 cursor-pointer select-none"
                  onClick={() =>
                    setSortDir(sortDir === "asc" ? "desc" : "asc")
                  }
                >
                  Announcement Date{" "}
                  <span className="ml-1 text-[10px]">
                    {sortDir === "asc" ? "▲" : "▼"}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((p) => (
                <tr
                  key={p.project_id}
                  className="border-t border-slate-800/80 hover:bg-slate-900/80 transition-colors"
                >
                  <td className="px-4 py-3 align-top">
                    <a
                      href={p.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      {p.name}
                    </a>
                    {p.description && (
                      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
                        {p.description}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    {p.jurisdiction}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    {p.issuer}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    {p.status}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    {p.announcement_date || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
