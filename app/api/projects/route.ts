// app/api/projects/route.ts
import { NextResponse } from "next/server";
import projects from "../../../data/projects.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("project_id");

  // 1. Single project lookup
  if (projectId) {
    const project = (projects as any[]).find(
      (p) => p.project_id === projectId
    );
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  }

  // 2. Existing list filters
  const jurisdiction = searchParams.get("jurisdiction");
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  let filtered = projects as any[];

  if (jurisdiction && jurisdiction !== "All") {
    filtered = filtered.filter((p) => p.jurisdiction === jurisdiction);
  }
  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (status && status !== "All") {
    filtered = filtered.filter((p) => p.status === status);
  }

  return NextResponse.json(filtered);
}

