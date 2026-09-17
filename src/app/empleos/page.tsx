import { Suspense } from "react";
import { JobRow } from "@/components/JobRow";
import { JobsFilters } from "@/components/JobsFilters";
import { getJobs, SOURCE_LABEL } from "@/lib/jobs/aggregate";
import type { JobSource } from "@/lib/jobs/types";

type SearchParams = Promise<{
  q?: string;
  source?: string;
}>;

export default async function EmpleosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || undefined;
  const sourceParam = params.source;
  const source =
    sourceParam === "remotive" ||
    sourceParam === "jobicy" ||
    sourceParam === "himalayas"
      ? (sourceParam as JobSource)
      : "all";

  const data = await getJobs({ q, source, limit: 50 });

  return (
    <>
      <div className="page-head">
        <h1>Remote jobs</h1>
        <p>
          {data.total} listings
          {q ? ` for “${q}”` : ""} aggregated from public APIs.
        </p>
      </div>

      <Suspense fallback={null}>
        <JobsFilters initialQ={q ?? ""} initialSource={source} />
      </Suspense>

      <div className="sources-bar">
        {(Object.keys(data.sources) as JobSource[]).map((key) => {
          const info = data.sources[key];
          if (!info) return null;
          return (
            <span key={key}>
              {SOURCE_LABEL[key]}: {info.ok ? `${info.count}` : "error"}
            </span>
          );
        })}
      </div>

      <div className="job-list">
        {data.jobs.length === 0 ? (
          <p className="muted">No results. Try another search.</p>
        ) : (
          data.jobs.map((job) => <JobRow key={job.id} job={job} />)
        )}
      </div>
    </>
  );
}
