import { NextResponse } from "next/server";
import projectsData from "@/data/projects.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const projectId = searchParams.get("project_id");
  const jurisdiction = searchParams.get("jurisdiction");
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const q = searchParams.get("q");

  const projects = projectsData as any[];

  // 1) Single project lookup by project_id
  if (projectId) {
    const project = projects.find((p) => p.project_id === projectId);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  }

  // 2) List mode with filters + optional search
  let filtered = projects;

  if (jurisdiction && jurisdiction !== "All") {
    filtered = filtered.filter(
      (p) => p.jurisdiction === jurisdiction
    );
  }

  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (status && status !== "All") {
    filtered = filtered.filter((p) => p.status === status);
  }

  if (q && q.trim() !== "") {
    const term = q.trim().toLowerCase();

    filtered = filtered.filter((p) => {
      const haystack = [
        p.name,
        p.issuer,
        p.jurisdiction,
        p.category,
        p.status,
        p.description,
        p.regulator,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }

  return NextResponse.json(filtered);
}
