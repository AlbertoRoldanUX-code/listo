export type JobSource =
  | "remotive"
  | "jobicy"
  | "remoteok"
  | "arbeitnow";

export const ALL_SOURCES: JobSource[] = [
  "remotive",
  "jobicy",
  "remoteok",
  "arbeitnow",
];

export type Job = {
  id: string;
  source: JobSource;
  title: string;
  company: string;
  companyLogo?: string;
  url: string;
  applyUrl: string;
  description: string;
  descriptionHtml?: string;
  category?: string;
  tags: string[];
  salary?: string;
  location: string;
  jobType?: string;
  publishedAt: string;
};

export type JobsScope = "all" | "worldwide";

export type JobsQuery = {
  q?: string;
  category?: string;
  source?: JobSource | "all";
  scope?: JobsScope;
  limit?: number;
};

export type JobsResponse = {
  jobs: Job[];
  total: number;
  fetchedAt: string;
  sources: Partial<Record<JobSource, { ok: boolean; count: number; error?: string }>>;
};
