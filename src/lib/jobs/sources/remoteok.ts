import type { Job } from "../types";

type RemoteOkJob = {
  id?: string | number;
  slug?: string;
  company?: string;
  company_logo?: string;
  logo?: string;
  position?: string;
  description?: string;
  tags?: string[];
  url?: string;
  apply_url?: string;
  date?: number | string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
};

export async function fetchRemoteOk(search?: string, limit = 500): Promise<Job[]> {
  const res = await fetch("https://remoteok.com/api", {
    next: { revalidate: 1800 },
    headers: {
      Accept: "application/json",
      "User-Agent": "ListoJobBoard/1.0 (remote job aggregator)",
    },
  });

  if (!res.ok) throw new Error(`RemoteOK ${res.status}`);

  const data = (await res.json()) as Array<RemoteOkJob & { legal?: string }>;
  const jobs = data.filter((item) => !("legal" in item && item.legal) && item.position);

  const needle = search?.toLowerCase();

  return jobs
    .filter((job) => {
      if (!needle) return true;
      const hay = `${job.position} ${job.company} ${(job.tags ?? []).join(" ")}`.toLowerCase();
      return hay.includes(needle);
    })
    .slice(0, limit)
    .map((job) => {
      const id = job.id ?? job.slug ?? hash(`${job.company}-${job.position}`);
      const applyUrl =
        job.apply_url ||
        job.url ||
        (job.slug ? `https://remoteok.com/remote-jobs/${job.slug}` : "https://remoteok.com");
      const publishedAt =
        typeof job.date === "number"
          ? new Date(job.date * (job.date < 1e12 ? 1000 : 1)).toISOString()
          : job.date || new Date().toISOString();

      return {
        id: `remoteok-${id}`,
        source: "remoteok" as const,
        title: job.position || "Remote role",
        company: job.company || "Company",
        companyLogo: job.company_logo || job.logo || undefined,
        url: applyUrl,
        applyUrl,
        description: stripHtml(job.description || ""),
        descriptionHtml: job.description,
        category: job.tags?.[0],
        tags: job.tags ?? [],
        salary: formatSalary(job.salary_min, job.salary_max, job.salary_currency),
        location: job.location || "Worldwide",
        jobType: undefined,
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
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
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
