import { JobsPageView } from "@/components/JobsPageView";
import { getJobs } from "@/lib/jobs/aggregate";
import {
  ALL_SOURCES,
  type JobSource,
  type JobsScope,
} from "@/lib/jobs/types";

type SearchParams = Promise<{
  q?: string;
  source?: string;
  scope?: string;
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
  const scope: JobsScope =
    params.scope === "worldwide" ? "worldwide" : "all";

  const data = await getJobs({ q, source, scope, limit: 500 });

  return <JobsPageView data={data} q={q} source={source} scope={scope} />;
}
