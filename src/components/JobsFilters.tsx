"use client";

import { FormEvent, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { JobsScope } from "@/lib/jobs/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";

function jobsHref(nextQ: string, nextScope: JobsScope) {
  const params = new URLSearchParams();
  const query = nextQ.trim();
  if (query) params.set("q", query);
  if (nextScope === "worldwide") params.set("scope", "worldwide");
  const qs = params.toString();
  return qs ? `/jobs?${qs}` : "/jobs";
}

export function JobsFilters({
  initialQ = "",
  initialScope = "all",
}: {
  initialQ?: string;
  initialScope?: JobsScope;
}) {
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const q = searchParams.get("q") ?? initialQ;
  const scope: JobsScope =
    (searchParams.get("scope") ?? initialScope) === "worldwide"
      ? "worldwide"
      : "all";

  const scopes: { value: JobsScope; label: string }[] = [
    { value: "all", label: t.jobsAll },
    { value: "worldwide", label: t.jobsWorldwide },
  ];

  function go(nextQ: string, nextScope: JobsScope = scope) {
    setIsSearching(true);
    const href = jobsHref(nextQ, nextScope);
    if (href === `${window.location.pathname}${window.location.search}`) {
      window.location.reload();
      return;
    }
    window.location.assign(href);
  }

  function currentQuery() {
    return inputRef.current?.value ?? q;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Empty query is intentional: show all offers.
    go(currentQuery(), scope);
  }

  return (
    <form className="jobs-filters" action="/jobs" method="get" onSubmit={onSubmit}>
      <div className="jobs-filters__search">
        <label htmlFor="jobs-q">{t.jobsSearch}</label>
        <input
          key={`q-${q}`}
          ref={inputRef}
          id="jobs-q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder={t.jobsSearchPlaceholder}
          enterKeyHint="search"
          disabled={isSearching}
        />
      </div>
      <div className="jobs-filters__scope">
        <span id="scope-label">{t.jobsScope}</span>
        <div className="source-pills" role="group" aria-labelledby="scope-label">
          {scopes.map((s) => (
            <button
              key={s.value}
              type="button"
              className={scope === s.value ? "is-active" : undefined}
              onClick={() => go(currentQuery(), s.value)}
              disabled={isSearching}
            >
              {s.label}
            </button>
          ))}
        </div>
        {scope === "worldwide" ? (
          <input type="hidden" name="scope" value="worldwide" />
        ) : null}
      </div>
      <button
        type="submit"
        className="jobs-filters__submit"
        disabled={isSearching}
        aria-busy={isSearching}
      >
        {isSearching ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            <span className="sr-only">{t.jobsSearching}</span>
          </>
        ) : (
          t.jobsSearch
        )}
      </button>
    </form>
  );
}
