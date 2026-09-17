import { JobsPageView } from "@/components/JobsPageView";
import { getJobs } from "@/lib/jobs/aggregate";
import type { JobsScope } from "@/lib/jobs/types";

type SearchParams = Promise<{
  q?: string;
  scope?: string;
}>;

export default async function JobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || undefined;
  const scope: JobsScope =
    params.scope === "worldwide" ? "worldwide" : "all";

  const data = await getJobs({ q, scope, limit: 800 });

  return <JobsPageView data={data} q={q} scope={scope} />;
}
