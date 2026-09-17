import Link from "next/link";
import { notFound } from "next/navigation";
import { EasyApply } from "@/components/EasyApply";
import { getJobById, SOURCE_LABEL } from "@/lib/jobs/aggregate";

type Params = Promise<{ id: string }>;

export default async function JobDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const job = await getJobById(decodeURIComponent(id));

  if (!job) notFound();

  return (
    <div className="job-detail">
      <article className="job-detail__main">
        <p>
          <Link href="/empleos">← Back</Link>
        </p>
        <p className="job-row__company">
          {job.company} · {SOURCE_LABEL[job.source]}
        </p>
        <h1>{job.title}</h1>
        <p className="job-detail__meta">
          <span>{job.location}</span>
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
