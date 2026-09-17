import type { Job } from "../types";

type JobicyJob = {
  id: number | string;
  url: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  jobIndustry?: string[];
  jobType?: string[];
  jobGeo?: string;
  jobLevel?: string;
  pubDate?: string;
  annualSalaryMin?: number;
  annualSalaryMax?: number;
  salaryCurrency?: string;
  jobDescription?: string;
  jobExcerpt?: string;
};

type JobicyResponse = {
  jobs?: JobicyJob[];
};

export async function fetchJobicy(search?: string, limit = 100): Promise<Job[]> {
  const params = new URLSearchParams();
  // Jobicy caps at 100 per request.
  params.set("count", String(Math.min(Math.max(limit, 1), 100)));
  if (search && search.length >= 3) params.set("tag", search.slice(0, 50));

  const res = await fetch(`https://jobicy.com/api/v2/remote-jobs?${params}`, {
    next: { revalidate: 1800 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`Jobicy ${res.status}`);

  const data = (await res.json()) as JobicyResponse;

  return (data.jobs ?? []).map((job) => {
    const salary = formatSalary(
      job.annualSalaryMin,
      job.annualSalaryMax,
      job.salaryCurrency,
    );

    return {
      id: `jobicy-${job.id}`,
      source: "jobicy" as const,
      title: job.jobTitle,
      company: job.companyName,
      companyLogo: job.companyLogo || undefined,
      url: job.url,
      applyUrl: job.url,
      description: stripHtml(job.jobDescription || job.jobExcerpt || ""),
      descriptionHtml: job.jobDescription,
      category: job.jobIndustry?.[0],
      tags: [...(job.jobIndustry ?? []), ...(job.jobType ?? []), job.jobLevel].filter(
        Boolean,
      ) as string[],
      salary,
      location: job.jobGeo || "Remoto",
      jobType: job.jobType?.[0],
      publishedAt: job.pubDate || new Date().toISOString(),
    };
  });
}

function formatSalary(
  min?: number,
  max?: number,
  currency = "USD",
): string | undefined {
  if (!min && !max) return undefined;
  const fmt = (n: number) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(n);

  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `Desde ${fmt(min)}`;
  if (max) return `Hasta ${fmt(max)}`;
  return undefined;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
