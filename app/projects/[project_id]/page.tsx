import Link from "next/link";
import projectsData from "@/data/projects.json";

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
  regulator?: string;
  technical_stack?: string;
  key_participants?: string[];
  notes?: string;
};

export default async function ProjectDetailPage(props: {
  params: Promise<{ project_id: string }>;
}) {
  // ✅ Unwrap the params Promise (Next.js 16 behaviour)
  const { project_id } = await props.params;

  const project = (projectsData as Project[]).find(
    (p) => p.project_id === project_id
  );

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <p className="mb-4 text-sm text-slate-600">
          Project not found or no longer available.
        </p>
        <Link
          href="/projects"
          className="text-sm text-cyan-600 hover:underline"
        >
          ← Back to all projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Link
        href="/projects"
        className="text-sm text-cyan-600 hover:underline"
      >
        ← Back to all projects
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
        {project.name}
      </h1>

      {project.description && (
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          {project.description}
        </p>
      )}

      <div className="mt-6 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
        <DetailItem label="Jurisdiction" value={project.jurisdiction} />
        <DetailItem label="Category" value={project.category} />
        <DetailItem label="Issuer" value={project.issuer} />
        <DetailItem label="Status" value={project.status} />
        <DetailItem label="Regulator" value={project.regulator} />
        <DetailItem label="Announcement Date" value={project.announcement_date} />
      </div>

      {project.url && (
        <div className="mt-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-500 hover:underline"
          >
            View official source ↗
          </a>
        </div>
      )}

      {project.key_participants && project.key_participants.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
            Key Participants
          </h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
            {project.key_participants.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      {project.technical_stack && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
            Technical Stack
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            {project.technical_stack}
          </p>
        </section>
      )}

      {project.notes && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
            Notes
          </h2>
          <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">
            {project.notes}
          </p>
        </section>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-800">{value}</div>
    </div>
  );
}
