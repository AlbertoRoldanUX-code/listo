import { JobsPageView } from "@/components/JobsPageView";
import { getJobs } from "@/lib/jobs/aggregate";
import { ALL_SOURCES, type JobSource } from "@/lib/jobs/types";

type SearchParams = Promise<{
  q?: string;
  source?: string;
}>;

export default async function JobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || undefined;
  const sourceParam = params.source;
  const source = ALL_SOURCES.includes(sourceParam as JobSource)
    ? (sourceParam as JobSource)
    : "all";

  const data = await getJobs({ q, source, limit: 50 });

  return <JobsPageView data={data} q={q} source={source} />;
}
