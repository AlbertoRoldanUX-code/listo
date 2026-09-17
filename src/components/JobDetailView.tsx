"use client";

import Link from "next/link";
import { EasyApply } from "@/components/EasyApply";
import type { Job } from "@/lib/jobs/types";
import { isWorldwideLocation } from "@/lib/jobs/worldwide";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function JobDetailView({ job }: { job: Job }) {
  const { t } = useI18n();
  const worldwide = isWorldwideLocation(job.location);

  return (
    <div className="job-detail">
      <article className="job-detail__main">
        <p>
          <Link href="/jobs">{t.back}</Link>
        </p>
        <p className="job-row__company">{job.company}</p>
        <h1>{job.title}</h1>
        <p className="job-detail__meta">
          <span>{job.location}</span>
          {worldwide ? (
            <span className="job-row__badge">{t.jobsWorldwideBadge}</span>
          ) : null}
          {job.salary ? <span>{job.salary}</span> : null}
          {job.jobType ? <span>{job.jobType}</span> : null}
          {job.category ? <span>{job.category}</span> : null}
        </p>
        {job.tags.length > 0 ? (
          <div className="job-detail__tags">
            {job.tags.slice(0, 10).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        {job.descriptionHtml ? (
          <div
            className="job-detail__body job-detail__body--html"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.descriptionHtml) }}
          />
        ) : (
          <div className="job-detail__body">{job.description}</div>
        )}
      </article>
      <EasyApply job={job} />
    </div>
  );
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}
