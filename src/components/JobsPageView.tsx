"use client";

import { Suspense } from "react";
import { JobRow } from "@/components/JobRow";
import { JobsFilters } from "@/components/JobsFilters";
import { SOURCE_LABEL } from "@/lib/jobs/labels";
import type { Job, JobSource, JobsResponse } from "@/lib/jobs/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function JobsPageView({
  data,
  q,
  source,
}: {
  data: JobsResponse;
  q?: string;
  source: JobSource | "all";
}) {
  const { t } = useI18n();

  return (
    <>
      <div className="page-head">
        <h1>{t.jobsTitle}</h1>
        <p>{t.jobsSub(data.total, q)}</p>
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
              {SOURCE_LABEL[key]}: {info.ok ? `${info.count}` : t.jobsError}
            </span>
          );
        })}
      </div>

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
