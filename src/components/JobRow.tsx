import Link from "next/link";
import type { Job } from "@/lib/jobs/types";
import { SOURCE_LABEL } from "@/lib/jobs/aggregate";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (Number.isNaN(days) || days < 0) return "Recent";
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} wk ago`;
  return `${Math.floor(days / 30)} mo ago`;
}

export function JobRow({ job }: { job: Job }) {
  return (
    <Link href={`/empleos/${encodeURIComponent(job.id)}`} className="job-row">
      <div className="job-row__main">
        <p className="job-row__company">{job.company}</p>
        <h3 className="job-row__title">{job.title}</h3>
        <p className="job-row__meta">
          <span>{job.location}</span>
          {job.salary ? <span>{job.salary}</span> : null}
          {job.jobType ? <span>{job.jobType}</span> : null}
        </p>
      </div>
      <div className="job-row__side">
        <span className="job-row__source">{SOURCE_LABEL[job.source]}</span>
        <span className="job-row__date">{timeAgo(job.publishedAt)}</span>
      </div>
    </Link>
  );
}
