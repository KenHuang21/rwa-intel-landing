// app/api/projects/route.ts
import { NextResponse } from "next/server";
import projects from "../../../data/projects.json";

export async function GET(request: Request) {
  // Optional: Support simple filters via query params
  const { searchParams } = new URL(request.url);
  const jurisdiction = searchParams.get("jurisdiction");
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  let result = projects as any[];

  if (jurisdiction) {
    result = result.filter((p) => p.jurisdiction.toLowerCase() === jurisdiction.toLowerCase());
  }

  if (category) {
    result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (status) {
    result = result.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  }

  return NextResponse.json(result);
}
