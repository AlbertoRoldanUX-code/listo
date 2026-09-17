"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SOURCE_LABEL } from "@/lib/jobs/labels";
import type { JobSource, JobsScope } from "@/lib/jobs/types";
import { ALL_SOURCES } from "@/lib/jobs/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function JobsFilters({
  initialQ = "",
  initialSource = "all",
  initialScope = "all",
}: {
  initialQ?: string;
  initialSource?: string;
  initialScope?: JobsScope;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [q, setQ] = useState(initialQ);
  const [source, setSource] = useState(initialSource);
  const [scope, setScope] = useState<JobsScope>(initialScope);

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    setSource(searchParams.get("source") ?? "all");
    setScope(
      searchParams.get("scope") === "worldwide" ? "worldwide" : "all",
    );
  }, [searchParams]);

  const sources = [
    { value: "all", label: t.jobsAll },
    ...ALL_SOURCES.map((value) => ({
      value,
      label: SOURCE_LABEL[value as JobSource],
    })),
  ];

  const scopes: { value: JobsScope; label: string }[] = [
    { value: "all", label: t.jobsAll },
    { value: "worldwide", label: t.jobsWorldwide },
  ];

  function pushFilters(next: { source?: string; scope?: JobsScope }) {
    const nextSource = next.source ?? source;
    const nextScope = next.scope ?? scope;
    const params = new URLSearchParams();
    const query = q.trim();
    if (query) params.set("q", query);
    if (nextSource && nextSource !== "all") params.set("source", nextSource);
    if (nextScope === "worldwide") params.set("scope", "worldwide");
    const qs = params.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs");
    router.refresh();
  }

  function selectSource(nextSource: string) {
    setSource(nextSource);
    pushFilters({ source: nextSource });
  }

  function selectScope(nextScope: JobsScope) {
    setScope(nextScope);
    pushFilters({ scope: nextScope });
  }

  return (
    <form className="jobs-filters" action="/jobs" method="get">
      <div className="jobs-filters__search">
        <label htmlFor="jobs-q">{t.jobsSearch}</label>
        <input
          id="jobs-q"
          name="q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.jobsSearchPlaceholder}
          enterKeyHint="search"
        />
      </div>
      <div className="jobs-filters__source">
        <span id="source-label">{t.jobsSource}</span>
        <div className="source-pills" role="group" aria-labelledby="source-label">
          {sources.map((s) => (
            <button
              key={s.value}
              type="button"
              className={source === s.value ? "is-active" : undefined}
              onClick={() => selectSource(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {source !== "all" ? (
          <input type="hidden" name="source" value={source} />
        ) : null}
      </div>
      <div className="jobs-filters__scope">
        <span id="scope-label">{t.jobsScope}</span>
        <div className="source-pills" role="group" aria-labelledby="scope-label">
          {scopes.map((s) => (
            <button
              key={s.value}
              type="button"
              className={scope === s.value ? "is-active" : undefined}
              onClick={() => selectScope(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {scope === "worldwide" ? (
          <input type="hidden" name="scope" value="worldwide" />
        ) : null}
      </div>
      <button type="submit" className="jobs-filters__submit">
        {t.jobsFilter}
      </button>
    </form>
  );
}
