import { ApplicationsList } from "@/components/ApplicationsList";

export default function PostulacionesPage() {
  return (
    <>
      <div className="page-head">
        <h1>Applications</h1>
        <p>Local tracking of what you saved or applied to.</p>
      </div>
      <ApplicationsList />
    </>
  );
}
