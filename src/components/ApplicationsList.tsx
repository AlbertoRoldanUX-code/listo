"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  loadApplications,
  removeApplication,
  type Application,
} from "@/lib/applications";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function ApplicationsList() {
  const { t, locale } = useI18n();
  const [apps, setApps] = useState<Application[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setApps(loadApplications());
    setHydrated(true);
  }, []);

  if (!hydrated) return <p className="muted">{t.appsLoading}</p>;

  if (apps.length === 0) {
    return (
      <div className="empty-state">
        <p>{t.appsEmpty}</p>
        <Link href="/jobs" className="btn btn--primary">
          {t.appsBrowse}
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
              <Link href={`/jobs/${encodeURIComponent(app.jobId)}`}>
                {app.title}
              </Link>
            </h3>
            <p className="apps-list__meta">
              <span data-status={app.status}>
                {app.status === "applied" ? t.appsApplied : t.appsSaved}
              </span>
              <span>
                {new Date(app.appliedAt).toLocaleDateString(
                  locale === "ka" ? "ka-GE" : "en",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>
            </p>
          </div>
          <div className="apps-list__actions">
            <a
              href={app.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              {t.appsOpen}
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setApps(removeApplication(app.jobId))}
            >
              {t.appsRemove}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
