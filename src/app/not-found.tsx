import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-head">
      <h1>Not found</h1>
      <p>That job is no longer in the cached list, or the link is invalid.</p>
      <p style={{ marginTop: "1.25rem" }}>
        <Link href="/empleos" className="btn btn--primary">
          View jobs
        </Link>
      </p>
    </div>
  );
}
