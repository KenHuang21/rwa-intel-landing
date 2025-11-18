// app/projects/page.tsx
"use client";

import projects from "../../data/projects.json";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-slate-100 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">RWA Project Registry</h1>

      <div className="overflow-x-auto rounded-xl border border-slate-800/60">
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
            {(projects as any[]).map((p) => (
              <tr key={p.project_id} className="border-b border-slate-800/40 hover:bg-slate-900/40">
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
    </div>
  );
}
