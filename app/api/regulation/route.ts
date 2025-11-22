import { NextResponse } from "next/server";
import regulationData from "@/data/regulation.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const regulationId = searchParams.get("regulation_id");
  const jurisdiction = searchParams.get("jurisdiction");
  const regulator = searchParams.get("regulator");
  const category = searchParams.get("category");
  const year = searchParams.get("year");
  const q = searchParams.get("q");

  const items = regulationData as any[];

  // 1) Single regulation lookup
  if (regulationId) {
    const item = items.find((r) => r.regulation_id === regulationId);
    if (!item) {
      return NextResponse.json(
        { error: "Regulation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(item);
  }

  // 2) List with filters + search
  let filtered = items;

  if (jurisdiction && jurisdiction !== "All") {
    filtered = filtered.filter((r) => r.jurisdiction === jurisdiction);
  }

  if (regulator && regulator !== "All") {
    filtered = filtered.filter((r) => r.regulator === regulator);
  }

  if (category && category !== "All") {
    filtered = filtered.filter((r) => r.category === category);
  }

  if (year && year !== "All") {
    filtered = filtered.filter(
      (r) =>
        typeof r.announcement_date === "string" &&
        r.announcement_date.startsWith(year)
    );
  }

  if (q && q.trim() !== "") {
    const term = q.trim().toLowerCase();

    filtered = filtered.filter((r) => {
      const haystack = [
        r.title,
        r.regulator,
        r.jurisdiction,
        r.category,
        r.reference_code,
        r.summary,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }

  return NextResponse.json(filtered);
}
