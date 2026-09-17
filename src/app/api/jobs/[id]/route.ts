import { NextResponse } from "next/server";
import { getJobById } from "@/lib/jobs/aggregate";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const job = await getJobById(decodeURIComponent(id));

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ job });
}
