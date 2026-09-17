import { unstable_cache } from "next/cache";
import type { Job, JobSource, JobsQuery, JobsResponse } from "./types";
import { ALL_SOURCES } from "./types";
import { fetchArbeitnow } from "./sources/arbeitnow";
import { fetchHimalayas } from "./sources/himalayas";
import { fetchJobicy } from "./sources/jobicy";
import { fetchRemoteOk } from "./sources/remoteok";
import { fetchRemotive } from "./sources/remotive";

export const SOURCE_LABEL: Record<JobSource, string> = {
  remotive: "Remotive",
  jobicy: "Jobicy",
  himalayas: "Himalayas",
  remoteok: "RemoteOK",
  arbeitnow: "Arbeitnow",
};

async function fetchAggregated(query: JobsQuery): Promise<JobsResponse> {
  const limit = query.limit ?? 40;
  const q = query.q?.trim() || undefined;
  const wanted = query.source && query.source !== "all" ? query.source : "all";

  const sources: JobsResponse["sources"] = {};
  const buckets: Job[][] = [];

  const allRunners: Array<{
    key: JobSource;
    run: () => Promise<Job[]>;
  }> = [
    { key: "remotive", run: () => fetchRemotive(q, limit) },
    { key: "jobicy", run: () => fetchJobicy(q, limit) },
    { key: "himalayas", run: () => fetchHimalayas(q, Math.min(limit, 20)) },
    { key: "remoteok", run: () => fetchRemoteOk(q, limit) },
    { key: "arbeitnow", run: () => fetchArbeitnow(q, limit) },
  ];
  const runners = allRunners.filter(
    (s) => wanted === "all" || wanted === s.key,
  );

  const settled = await Promise.all(
    runners.map(async (runner) => {
      try {
        const jobs = await runner.run();
        return { key: runner.key, jobs, ok: true as const };
      } catch (error) {
        return {
          key: runner.key,
          jobs: [] as Job[],
          ok: false as const,
          error: error instanceof Error ? error.message : "Error",
        };
      }
    }),
  );

  for (const result of settled) {
    sources[result.key] = {
      ok: result.ok,
      count: result.jobs.length,
      error: result.ok ? undefined : result.error,
    };
    if (result.jobs.length) buckets.push(result.jobs);
  }

  let jobs = interleave(buckets);

  if (query.category) {
    const cat = query.category.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.category?.toLowerCase().includes(cat) ||
        j.tags.some((t) => t.toLowerCase().includes(cat)),
    );
  }

  if (q) {
    const needle = q.toLowerCase();
    jobs = jobs.sort((a, b) => score(b, needle) - score(a, needle));
  } else {
    jobs = jobs.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  jobs = dedupe(jobs).slice(0, Math.max(limit * 2, 100));

  return {
    jobs,
    total: jobs.length,
    fetchedAt: new Date().toISOString(),
    sources,
  };
}

export async function getJobs(query: JobsQuery = {}): Promise<JobsResponse> {
  const key = JSON.stringify({
    q: query.q ?? "",
    category: query.category ?? "",
    source: query.source ?? "all",
    limit: query.limit ?? 40,
  });

  const cached = unstable_cache(
    async () => fetchAggregated(query),
    ["jobs-aggregate-v2", key],
    { revalidate: 1800 },
  );

  return cached();
}

export async function getJobById(id: string): Promise<Job | null> {
  const source = id.split("-")[0] as JobSource;
  if (!ALL_SOURCES.includes(source)) return null;

  const scoped = await getJobs({ source, limit: 100 });
  const found = scoped.jobs.find((j) => j.id === id);
  if (found) return found;

  const all = await getJobs({ limit: 100 });
  return all.jobs.find((j) => j.id === id) ?? null;
}

function interleave(buckets: Job[][]): Job[] {
  const out: Job[] = [];
  const max = Math.max(0, ...buckets.map((b) => b.length));
  for (let i = 0; i < max; i++) {
    for (const bucket of buckets) {
      if (bucket[i]) out.push(bucket[i]);
    }
  }
  return out;
}

function dedupe(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    const key = `${job.title.toLowerCase()}|${job.company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function score(job: Job, needle: string): number {
  let s = 0;
  if (job.title.toLowerCase().includes(needle)) s += 5;
  if (job.company.toLowerCase().includes(needle)) s += 3;
  if (job.tags.some((t) => t.toLowerCase().includes(needle))) s += 2;
  if (job.description.toLowerCase().includes(needle)) s += 1;
  return s;
}
