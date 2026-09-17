import type { Job } from "../types";

type HimalayasJob = {
  title?: string;
  excerpt?: string;
  description?: string;
  companyName?: string;
  companyLogo?: string;
  applicationLink?: string;
  guid?: string;
  pubDate?: number | string;
  categories?: string[];
  locationRestrictions?: string[];
  minSalary?: number;
  maxSalary?: number;
  currency?: string;
  employmentType?: string;
  seniority?: string[];
};

type HimalayasResponse = {
  jobs?: HimalayasJob[];
};

export async function fetchHimalayas(search?: string, limit = 40): Promise<Job[]> {
  const params = new URLSearchParams();
  params.set("limit", String(Math.min(limit, 20)));

  const endpoint = search
    ? `https://himalayas.app/jobs/api/search?q=${encodeURIComponent(search)}&${params}`
    : `https://himalayas.app/jobs/api?${params}`;

  const res = await fetch(endpoint, {
    next: { revalidate: 1800 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`Himalayas ${res.status}`);

  const data = (await res.json()) as HimalayasResponse;

  return (data.jobs ?? []).map((job, index) => {
    const guid = job.guid || `h-${index}-${job.title}`;
    const applyUrl = job.applicationLink || `https://himalayas.app/jobs`;
    const salary = formatSalary(job.minSalary, job.maxSalary, job.currency);
    const publishedAt =
      typeof job.pubDate === "number"
        ? new Date(job.pubDate * (job.pubDate < 1e12 ? 1000 : 1)).toISOString()
        : job.pubDate || new Date().toISOString();

    return {
      id: `himalayas-${hash(guid)}`,
      source: "himalayas" as const,
      title: job.title || "Puesto remoto",
      company: job.companyName || "Empresa",
      companyLogo: job.companyLogo || undefined,
      url: applyUrl,
      applyUrl,
      description: stripHtml(job.description || job.excerpt || ""),
      descriptionHtml: job.description,
      category: job.categories?.[0],
      tags: [
        ...(job.categories ?? []),
        ...(job.seniority ?? []),
        job.employmentType,
      ].filter(Boolean) as string[],
      salary,
      location: job.locationRestrictions?.length
        ? job.locationRestrictions.join(", ")
        : "Worldwide",
      jobType: job.employmentType,
      publishedAt,
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

function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}
