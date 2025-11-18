"use client";

import { useEffect, useState } from "react";

type Project = {
  project_id: string;
  name: string;
  jurisdiction: string;
  category: string;
  issuer: string;
  status: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-slate-100 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">RWA Project Registry</h1>

      {loading && (
        <p className="text-slate-400 text-sm">Loading projects...</p>
      )}

      {error && !loading && (
        <p className="text-red-400 text-sm mb-4">Error: {error}</p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-slate-400 text-sm">No projects found yet.</p>
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
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.project_id}
                  className="border-b border-slate-800/40 hover:bg-slate-900/40"
                >
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.jurisdiction}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.issuer}</td>
                  <td className="px-4 py-3">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
