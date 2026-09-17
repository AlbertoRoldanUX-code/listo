import { notFound } from "next/navigation";
import { JobDetailView } from "@/components/JobDetailView";
import { getJobById } from "@/lib/jobs/aggregate";

type Params = Promise<{ id: string }>;

export default async function JobDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const job = await getJobById(decodeURIComponent(id));

  if (!job) notFound();

  return <JobDetailView job={job} />;
}
