import { NextRequest, NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs/aggregate";
import type { JobsScope } from "@/lib/jobs/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const scope: JobsScope =
    searchParams.get("scope") === "worldwide" ? "worldwide" : "all";
  const limit = Number(searchParams.get("limit") ?? "800");

  try {
    const data = await getJobs({
      q,
      category,
      scope,
      limit: Number.isFinite(limit) ? limit : 800,
    });
    // Keep internals out of the public payload — callers only need jobs to apply.
    const { jobs, total, fetchedAt } = data;
    return NextResponse.json({ jobs, total, fetchedAt });
  } catch (error) {
    return NextResponse.json(
      {
        jobs: [],
        total: 0,
        fetchedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Failed to fetch jobs",
      },
      { status: 500 },
    );
  }
}
