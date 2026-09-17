import { unstable_cache } from "next/cache";
import type { Job, JobSource, JobsQuery, JobsResponse } from "./types";
import { ALL_SOURCES } from "./types";
import { fetchArbeitnow } from "./sources/arbeitnow";
import { fetchJobicy } from "./sources/jobicy";
import { fetchRemoteOk } from "./sources/remoteok";
import { fetchRemotive } from "./sources/remotive";
import { isWorldwideLocation } from "./worldwide";

export { isWorldwideLocation } from "./worldwide";

const AGGREGATE_CACHE = "jobs-aggregate-v5";
const JOB_DETAIL_CACHE = "job-detail-v5";
const DEFAULT_LIMIT = 800;
const MAX_LIMIT = 2000;

async function fetchAggregated(query: JobsQuery): Promise<JobsResponse> {
  const limit = Math.min(Math.max(query.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
  const q = query.q?.trim() || undefined;
  const wanted = query.source && query.source !== "all" ? query.source : "all";
  const worldwideOnly = query.scope === "worldwide";
  // Over-fetch so worldwide / category filters still leave a full list.
  const fetchLimit = worldwideOnly
    ? Math.min(Math.max(limit * 2, 400), MAX_LIMIT)
    : Math.min(Math.max(limit, 200), MAX_LIMIT);

  const sources: JobsResponse["sources"] = {};
  const buckets: Job[][] = [];

  const allRunners: Array<{
    key: JobSource;
    run: () => Promise<Job[]>;
  }> = [
    { key: "remotive", run: () => fetchRemotive(q, fetchLimit) },
    { key: "jobicy", run: () => fetchJobicy(q, fetchLimit) },
    { key: "remoteok", run: () => fetchRemoteOk(q, fetchLimit) },
    { key: "arbeitnow", run: () => fetchArbeitnow(q, fetchLimit) },
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

  if (worldwideOnly) {
    jobs = jobs.filter((j) => isWorldwideLocation(j.location));
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

  jobs = dedupe(jobs).slice(0, limit);

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
    scope: query.scope ?? "all",
    limit: query.limit ?? DEFAULT_LIMIT,
  });

  const cached = unstable_cache(
    async () => fetchAggregated(query),
    [AGGREGATE_CACHE, key],
    { revalidate: 1800 },
  );

  const data = await cached();
  // Warm per-id cache without blocking the list response (large result sets).
  void Promise.all(data.jobs.map((job) => warmJobCache(job)));
  return data;
}

export async function getJobById(id: string): Promise<Job | null> {
  const warmed = await readWarmedJob(id);
  if (warmed) return warmed;
  // Fallback for shared links / cold cache — do not cache misses.
  return lookupJob(id);
}

async function warmJobCache(job: Job): Promise<Job> {
  return unstable_cache(async () => job, [JOB_DETAIL_CACHE, job.id], {
    revalidate: 1800,
  })();
}

/** Read a job previously warmed by getJobs. Throws on miss so we never cache null. */
async function readWarmedJob(id: string): Promise<Job | null> {
  try {
    return await unstable_cache(
      async (): Promise<Job> => {
        throw new Error("NOT_WARMED");
      },
      [JOB_DETAIL_CACHE, id],
      { revalidate: 1800 },
    )();
  } catch {
    return null;
  }
}

async function lookupJob(id: string): Promise<Job | null> {
  const source = ALL_SOURCES.find((s) => id.startsWith(`${s}-`));
  if (!source) return null;

  const scoped = await fetchAggregated({ source, limit: MAX_LIMIT });
  const found = scoped.jobs.find((j) => j.id === id);
  if (found) {
    await warmJobCache(found);
    return found;
  }

  const all = await fetchAggregated({ limit: MAX_LIMIT });
  const again = all.jobs.find((j) => j.id === id) ?? null;
  if (again) await warmJobCache(again);
  return again;
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
