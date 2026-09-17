"use client";

import { Suspense } from "react";
import { JobRow } from "@/components/JobRow";
import { JobsFilters } from "@/components/JobsFilters";
import type { Job, JobsResponse, JobsScope } from "@/lib/jobs/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function JobsPageView({
  data,
  q,
  scope,
}: {
  data: JobsResponse;
  q?: string;
  scope: JobsScope;
}) {
  const { t } = useI18n();
  const worldwide = scope === "worldwide";

  return (
    <>
      <div className="page-head">
        <h1>{t.jobsTitle}</h1>
        <p>{t.jobsSub(data.total, q, worldwide)}</p>
      </div>

      <Suspense fallback={null}>
        <JobsFilters initialQ={q ?? ""} initialScope={scope} />
      </Suspense>

      <div className="job-list">
        {data.jobs.length === 0 ? (
          <p className="muted">{t.jobsEmpty}</p>
        ) : (
          data.jobs.map((job: Job) => <JobRow key={job.id} job={job} />)
        )}
      </div>
    </>
  );
}
