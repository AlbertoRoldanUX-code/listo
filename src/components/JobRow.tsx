"use client";

import Link from "next/link";
import { useState } from "react";
import { applyToJob } from "@/lib/apply";
import type { Job } from "@/lib/jobs/types";
import { SOURCE_LABEL } from "@/lib/jobs/labels";
import { isWorldwideLocation } from "@/lib/jobs/worldwide";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function timeAgo(iso: string, t: Dictionary): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (Number.isNaN(days) || days < 0) return t.timeRecent;
  if (days === 0) return t.timeToday;
  if (days === 1) return t.timeYesterday;
  if (days < 7) return t.timeDays(days);
  if (days < 30) return t.timeWeeks(Math.floor(days / 7));
  return t.timeMonths(Math.floor(days / 30));
}

export function JobRow({ job }: { job: Job }) {
  const { t } = useI18n();
  const [applied, setApplied] = useState(false);
  const href = `/jobs/${encodeURIComponent(job.id)}`;
  const worldwide = isWorldwideLocation(job.location);

  function handleApply(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    applyToJob(job);
    setApplied(true);
  }

  return (
    <article className="job-row">
      <Link href={href} className="job-row__main">
        <p className="job-row__company">{job.company}</p>
        <h3 className="job-row__title">{job.title}</h3>
        <p className="job-row__meta">
          <span>{job.location}</span>
          {worldwide ? (
            <span className="job-row__badge">{t.jobsWorldwideBadge}</span>
          ) : null}
          {job.salary ? <span>{job.salary}</span> : null}
          {job.jobType ? <span>{job.jobType}</span> : null}
        </p>
      </Link>
      <div className="job-row__side">
        <span className="job-row__source">{SOURCE_LABEL[job.source]}</span>
        <span className="job-row__date">{timeAgo(job.publishedAt, t)}</span>
        <button
          type="button"
          className="btn btn--primary job-row__apply"
          onClick={handleApply}
        >
          {applied ? t.jobsApplied : t.jobsApply}
        </button>
      </div>
    </article>
  );
}
