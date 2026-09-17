import { upsertApplication } from "@/lib/applications";
import type { Job } from "@/lib/jobs/types";

export function applyToJob(job: Job, options?: { open?: boolean }): void {
  upsertApplication({
    id: crypto.randomUUID(),
    jobId: job.id,
    title: job.title,
    company: job.company,
    applyUrl: job.applyUrl,
    source: job.source,
    status: "applied",
    appliedAt: new Date().toISOString(),
  });

  if (options?.open !== false) {
    window.open(job.applyUrl, "_blank", "noopener,noreferrer");
  }
}

export function saveJobForLater(job: Job): void {
  upsertApplication({
    id: crypto.randomUUID(),
    jobId: job.id,
    title: job.title,
    company: job.company,
    applyUrl: job.applyUrl,
    source: job.source,
    status: "saved",
    appliedAt: new Date().toISOString(),
  });
}
