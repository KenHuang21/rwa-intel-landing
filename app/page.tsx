"use client"

import { useState } from "react";
import { ArrowRight, CheckCircle2, LineChart, Database, Bot, Search, ShieldCheck } from "lucide-react";
import projects from "../data/projects.json";


// Tailwind-only, minimal dependencies. shadcn/ui is available if you prefer to swap in components later.
// Replace the dummy onSubmit with your waitlist provider (Tally/Typeform/MailerLite). 

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate Tally/Typeform/Airtable/MailerLite webhook here.
    // Example: fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) })
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}


      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                The Intelligence Hub for the <span className="text-cyan-400">Global Tokenisation</span> Economy
              </h1>
              <p className="mt-5 text-slate-300 text-lg">
                Track every tokenised asset, issuer, and regulation — in one AI-powered dashboard.
                From Hong Kong to Singapore and beyond.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#waitlist" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors">
                  Join Early Access <ArrowRight size={18} />
                </a>
                <a href="#insights" className="inline-flex items-center justify-center gap-2 rounded-2xl ring-1 ring-slate-700 px-5 py-3 text-slate-200 font-semibold hover:bg-slate-900">
                  View Sample Insights
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><ShieldCheck size={16} /> Built by industry insiders</span>
                <span className="inline-flex items-center gap-2"><Bot size={16} /> Powered by AI</span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-2xl ring-1 ring-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <HeroCard
                    title="Projects Indexed"
                    value={String((projects as any[]).length)}
                    subtitle="HK & SG pilots"
                  />
                  <HeroCard title="Jurisdictions" value="14" subtitle="with RWA activity" />
                  <HeroCard title="Chains" value="11" subtitle="L1/L2 coverage" />
                  <HeroCard title="Custodians" value="25" subtitle="infra directory" />
                </div>
                <div className="mt-6 rounded-2xl bg-slate-950/60 ring-1 ring-slate-800 p-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <LineChart size={18} />
                    <span className="font-medium">Weekly Insight:</span>
                    <span className="text-slate-400">HKMA Pilots expand CBDC settlement tests in Q1</span>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-x-10 -bottom-10 -z-10 blur-3xl opacity-30" aria-hidden>
                <div className="h-64 bg-gradient-to-tr from-cyan-500/30 to-purple-500/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / social proof placeholder */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            Early access for institutions and startups in Hong Kong & Singapore — limited to the first 100 organisations.
          </p>
        </div>
      </section>

      {/* Sourcing Transparency */}
      <section className="py-20 border-t border-slate-800/60 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold">Sourcing Transparency</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            All data is sourced exclusively from official regulators, governments, licensed institutions, issuers, and auditors.
            No speculative or unverified sources. Every entry includes citations and update timestamps.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-slate-800/60 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold">One dashboard. One source of truth.</h2>
            <p className="mt-4 text-slate-400">AI agents collect, clean, and connect tokenisation data across regulators, issuers, chains, and service providers.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature icon={<Database className="h-5 w-5" />} title="Unified RWA Registry" desc="Projects, issuers, asset classes, chains, custodians — fully searchable and exportable." />
            <Feature icon={<Search className="h-5 w-5" />} title="Filings → Structured Data" desc="LLM summarisation converts regulatory text and PRs into clean JSON entries." />
            <Feature icon={<Bot className="h-5 w-5" />} title="Agentic Monitoring" desc="Daily crawls with dedupe, QA rules, and trend detection." />
            <Feature icon={<LineChart className="h-5 w-5" />} title="Analytics Layer" desc="Compare jurisdictions, chains, and categories over time." />
            <Feature icon={<ShieldCheck className="h-5 w-5" />} title="RegTech-Grade" desc="Audit trail, sources, and update timestamps for institutional trust." />
            <Feature icon={<CheckCircle2 className="h-5 w-5" />} title="Founder-Market Fit" desc="Built by tokenisation practitioners for decision-makers." />
          </div>
        </div>
      </section>

      {/* Insights sample */}
      <section id="insights" className="py-20 border-t border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <InsightCard title="HKMA x Pilot Insights" tag="Hong Kong" summary="CBDC settlement and tokenised bond pilots broaden collateral scope; 3 new custodians added." />
            <InsightCard title="MAS Project Orchid" tag="Singapore" summary="Stablecoin and purpose-bound money trials align with security token infra; Interop with pilots expanding." />
            <InsightCard title="EU Tokenisation Update" tag="EU" summary="MiCA + DLT Pilot Regime drive issuance frameworks; custody and secondary trading activation increasing." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 border-t border-slate-800/60 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold">Pricing Preview</h2>
            <p className="mt-3 text-slate-400">Founding users receive a lifetime 30% discount. Institutional pilots by invitation.</p>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <PriceCard name="Analyst" price="$99/mo" cta="Join Waitlist" features={["Dashboard access", "Weekly RWA digest", "Basic search & export"]} />
            <PriceCard name="Pro" price="$499/mo" highlight cta="Reserve Spot" features={["Full database & filters", "Alerts & change logs", "Jurisdiction analytics"]} />
            <PriceCard name="Institutional" price="$2,000+/mo" cta="Request Pilot" features={["API & bulk export", "Monthly analyst call", "Priority roadmap input"]} />
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20 border-t border-slate-800/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-4xl font-bold">Be first to access the new data layer.</h3>
          <p className="mt-3 text-slate-400">Initial focus: Hong Kong & Singapore. Limited private beta (100 organisations).</p>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30 p-6 text-emerald-200">
              Thanks! You’re on the list. We’ll be in touch with early access details.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid sm:grid-cols-[1fr_auto] gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="w-full rounded-2xl bg-slate-900 ring-1 ring-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors"
              >
                Join Early Access <ArrowRight size={18} />
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-slate-500">We respect confidentiality. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-slate-800/60 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-4xl font-bold text-center">FAQ</h3>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Faq q="What sources do you monitor?" a="Regulator portals (e.g., HKMA, MAS, SFC), official press releases, issuer websites, and trusted industry trackers. Every entry includes source links and timestamps." />
            <Faq q="How accurate is the data?" a="Entries are generated by AI agents with human-in-the-loop checks for pilots and institutional clients. We maintain audit trails and change logs." />
            <Faq q="Which jurisdictions are covered first?" a="Phase 1 focuses on Hong Kong and Singapore, then expands to EU, UAE, and UK based on user demand." />
            <Faq q="Do you offer an API?" a="Yes — Institutional plan includes API and bulk export for internal dashboards and research workflows." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Tokenised RWA Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-white" href="#">Privacy</a>
            <a className="hover:text-white" href="#">Terms</a>
            <a className="hover:text-white" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-2xl ring-1 ring-slate-800 p-4 bg-slate-950/60">
      <div className="text-slate-400 text-xs uppercase tracking-wide">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className="text-slate-500 text-sm">{subtitle}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-5 ring-1 ring-slate-800 bg-slate-900/30">
      <div className="flex items-center gap-3 text-cyan-300">
        <div className="rounded-xl bg-cyan-500/10 p-2 ring-1 ring-cyan-300/20">{icon}</div>
        <h3 className="font-semibold text-slate-100">{title}</h3>
      </div>
      <p className="mt-3 text-slate-400 text-sm">{desc}</p>
    </div>
  );
}

function InsightCard({ title, tag, summary }: { title: string; tag: string; summary: string }) {
  return (
    <div className="rounded-2xl p-5 ring-1 ring-slate-800 bg-slate-900/30 hover:bg-slate-900/50 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded-lg bg-slate-800 text-slate-300 ring-1 ring-slate-700">{tag}</span>
        <span className="text-xs text-slate-500">Weekly sample</span>
      </div>
      <h4 className="mt-3 font-semibold text-lg">{title}</h4>
      <p className="mt-2 text-slate-400 text-sm">{summary}</p>
    </div>
  );
}

function PriceCard({ name, price, features, cta, highlight }: { name: string; price: string; features: string[]; cta: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ring-1 ${highlight ? "ring-cyan-500/50 bg-slate-900/50" : "ring-slate-800 bg-slate-900/30"}`}>
      <div className="flex items-baseline justify-between">
        <h4 className="text-xl font-semibold">{name}</h4>
        {highlight && <span className="text-xs text-cyan-300">Most popular</span>}
      </div>
      <div className="mt-2 text-3xl font-bold">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-cyan-300" /> {f}</li>
        ))}
      </ul>
      <a href="#waitlist" className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 font-medium transition-colors ${highlight ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400" : "ring-1 ring-slate-700 text-slate-200 hover:bg-slate-900"}`}>
        {cta} <ArrowRight size={16} />
      </a>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl p-5 ring-1 ring-slate-800 bg-slate-900/30">
      <h4 className="font-semibold">{q}</h4>
      <p className="mt-2 text-slate-400 text-sm leading-relaxed">{a}</p>
    </div>
  );
}
