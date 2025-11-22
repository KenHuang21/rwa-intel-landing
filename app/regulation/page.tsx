"use client";

import { useEffect, useState } from "react";

type Regulation = {
  regulation_id: string;
  title: string;
  jurisdiction: string;
  regulator: string;
  category: string;
  status: string;
  reference_code?: string;
  announcement_date?: string;
  url?: string;
  summary?: string;
};

const JURISDICTION_OPTIONS = ["All", "Hong Kong", "Singapore"];
const REGULATOR_OPTIONS = ["All", "HKMA", "SFC", "MAS"];
const CATEGORY_OPTIONS = [
  "All",
  "Tokenised Funds / Public Products",
  "Intermediaries / Tokenised Securities",
  "Tokenised Securities Infrastructure",
  "Tokenised Bonds / Deposits",
  "Policy / Roadmap"
];
const YEAR_OPTIONS = ["All", "2022", "2023", "2024"];

export default function RegulationPage() {
  const [items, setItems] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [jurisdiction, setJurisdiction] = useState("All");
  const [regulator, setRegulator] = useState("All");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [search, setSearch] = useState("");

  async function fetchRegulation() {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (jurisdiction !== "All") params.append("jurisdiction", jurisdiction);
      if (regulator !== "All") params.append("regulator", regulator);
      if (category !== "All") params.append("category", category);
      if (year !== "All") params.append("year", year);
      if (search.trim() !== "") params.append("q", search.trim());

      let url = "/api/regulation";
      const query = params.toString();
      if (query) url += `?${query}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = (await res.json()) as Regulation[];
      setItems(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load regulation items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRegulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Regulatory Library
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Search and filter official regulatory communications, circulars and
          tokenisation-related announcements across Hong Kong and Singapore.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Jurisdiction
            </label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {JURISDICTION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Regulator
            </label>
            <select
              value={regulator}
              onChange={(e) => setRegulator(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {REGULATOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {YEAR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] items-end">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, reference, regulator, summary..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div className="flex md:justify-end">
            <button
              type="button"
              onClick={fetchRegulation}
              className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-400 transition-colors md:w-auto"
            >
              Apply Filters &amp; Search
            </button>
          </div>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-sm text-slate-500">Loading regulatory items...</p>
      )}
      {error && !loading && (
        <p className="mb-4 text-sm text-red-500">Error: {error}</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="text-sm text-slate-500">No items found.</p>
      )}

      {/* Table */}
      {!loading && !error && items.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Jurisdiction
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Regulator
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ref / Date
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr
                  key={r.regulation_id}
                  className="border-t border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 align-top">
                    <a
                      href={r.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-cyan-700 hover:text-cyan-600 hover:underline"
                    >
                      {r.title}
                    </a>
                    {r.summary && (
                      <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-600">
                        {r.summary}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-700">
                    {r.jurisdiction}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-700">
                    {r.regulator}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-700">
                    {r.category}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-700 text-xs">
                    {r.reference_code && (
                      <div className="font-mono">{r.reference_code}</div>
                    )}
                    <div>{r.announcement_date || "-"}</div>
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
