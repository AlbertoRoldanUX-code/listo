import type { Job } from "../types";

type ArbeitnowJob = {
  slug?: string;
  company_name?: string;
  title?: string;
  description?: string;
  remote?: boolean;
  url?: string;
  location?: string;
  created_at?: number | string;
  tags?: string[];
  job_types?: string[];
};

type ArbeitnowResponse = {
  data?: ArbeitnowJob[];
  links?: { next?: string | null };
};

const MAX_PAGES = 8;

export async function fetchArbeitnow(search?: string, limit = 400): Promise<Job[]> {
  const collected: ArbeitnowJob[] = [];
  const needle = search?.toLowerCase();

  for (let page = 1; page <= MAX_PAGES && collected.length < limit; page++) {
    const res = await fetch(
      `https://www.arbeitnow.com/api/job-board-api?page=${page}`,
      {
        next: { revalidate: 1800 },
        headers: { Accept: "application/json" },
      },
    );

    if (!res.ok) {
      if (page === 1) throw new Error(`Arbeitnow ${res.status}`);
      break;
    }

    const data = (await res.json()) as ArbeitnowResponse;
    const batch = data.data ?? [];
    if (!batch.length) break;

    for (const job of batch) {
      if (job.remote === false) continue;
      if (needle) {
        const hay =
          `${job.title} ${job.company_name} ${(job.tags ?? []).join(" ")}`.toLowerCase();
        if (!hay.includes(needle)) continue;
      }
      collected.push(job);
      if (collected.length >= limit) break;
    }

    if (!data.links?.next) break;
  }

  return collected.slice(0, limit).map((job) => {
    const slug = job.slug || hash(`${job.company_name}-${job.title}`);
    const applyUrl = job.url || `https://www.arbeitnow.com/jobs/${slug}`;
    const publishedAt =
      typeof job.created_at === "number"
        ? new Date(job.created_at * (job.created_at < 1e12 ? 1000 : 1)).toISOString()
        : job.created_at || new Date().toISOString();

    return {
      id: `arbeitnow-${slug}`,
      source: "arbeitnow" as const,
      title: job.title || "Remote role",
      company: job.company_name || "Company",
      url: applyUrl,
      applyUrl,
      description: stripHtml(job.description || ""),
      descriptionHtml: job.description,
      category: job.tags?.[0],
      tags: [...(job.tags ?? []), ...(job.job_types ?? [])],
      location: job.location || "Remote",
      jobType: job.job_types?.[0],
      publishedAt,
    };
  });
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

function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}
