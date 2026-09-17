"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  loadApplications,
  removeApplication,
  type Application,
} from "@/lib/applications";

export function ApplicationsList() {
  const [apps, setApps] = useState<Application[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setApps(loadApplications());
    setHydrated(true);
  }, []);

  if (!hydrated) return <p className="muted">Loading…</p>;

  if (apps.length === 0) {
    return (
      <div className="empty-state">
        <p>No applications yet.</p>
        <Link href="/empleos" className="btn btn--primary">
          Browse jobs
        </Link>
      </div>
    );
  }

  return (
    <ul className="apps-list">
      {apps.map((app) => (
        <li key={app.id} className="apps-list__item">
          <div>
            <p className="apps-list__company">{app.company}</p>
            <h3>
              <Link href={`/empleos/${encodeURIComponent(app.jobId)}`}>
                {app.title}
              </Link>
            </h3>
            <p className="apps-list__meta">
              <span data-status={app.status}>
                {app.status === "applied" ? "Applied" : "Saved"}
              </span>
              <span>
                {new Date(app.appliedAt).toLocaleDateString("en", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
          <div className="apps-list__actions">
            <a href={app.applyUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Open
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setApps(removeApplication(app.jobId))}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
