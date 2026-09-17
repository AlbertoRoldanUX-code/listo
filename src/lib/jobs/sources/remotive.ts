import type { Job } from "../types";

type RemotiveJob = {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string;
  category?: string;
  tags?: string[];
  job_type?: string;
  publication_date?: string;
  candidate_required_location?: string;
  salary?: string;
  description?: string;
};

type RemotiveResponse = {
  jobs?: RemotiveJob[];
};

export async function fetchRemotive(search?: string, limit = 40): Promise<Job[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  params.set("limit", String(limit));

  const res = await fetch(`https://remotive.com/api/remote-jobs?${params}`, {
    next: { revalidate: 1800 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`Remotive ${res.status}`);

  const data = (await res.json()) as RemotiveResponse;

  return (data.jobs ?? []).map((job) => ({
    id: `remotive-${job.id}`,
    source: "remotive" as const,
    title: job.title,
    company: job.company_name,
    companyLogo: job.company_logo || undefined,
    url: job.url,
    applyUrl: job.url,
    description: stripHtml(job.description ?? ""),
    descriptionHtml: job.description,
    category: job.category,
    tags: job.tags ?? [],
    salary: job.salary || undefined,
    location: job.candidate_required_location || "Remoto",
    jobType: job.job_type || undefined,
    publishedAt: job.publication_date || new Date().toISOString(),
  }));
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
