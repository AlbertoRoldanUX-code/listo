import { NextRequest, NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs/aggregate";
import type { JobSource, JobsScope } from "@/lib/jobs/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const source = (searchParams.get("source") as JobSource | "all" | null) ?? "all";
  const scope: JobsScope =
    searchParams.get("scope") === "worldwide" ? "worldwide" : "all";
  const limit = Number(searchParams.get("limit") ?? "60");

  try {
    const data = await getJobs({
      q,
      category,
      source,
      scope,
      limit: Number.isFinite(limit) ? limit : 60,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        jobs: [],
        total: 0,
        fetchedAt: new Date().toISOString(),
        sources: {},
        error: error instanceof Error ? error.message : "Failed to fetch jobs",
      },
      { status: 500 },
    );
  }
}
