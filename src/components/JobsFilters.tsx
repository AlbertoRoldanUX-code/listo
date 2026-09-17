"use client";

import { FormEvent, KeyboardEvent, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SOURCE_LABEL } from "@/lib/jobs/labels";
import type { JobSource } from "@/lib/jobs/types";
import { ALL_SOURCES } from "@/lib/jobs/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";

function jobsHref(nextQ: string, nextSource: string) {
  const params = new URLSearchParams();
  const query = nextQ.trim();
  if (query) params.set("q", query);
  if (nextSource && nextSource !== "all") params.set("source", nextSource);
  const qs = params.toString();
  return qs ? `/jobs?${qs}` : "/jobs";
}

export function JobsFilters({
  initialQ = "",
  initialSource = "all",
}: {
  initialQ?: string;
  initialSource?: string;
}) {
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const q = searchParams.get("q") ?? initialQ;
  const source = searchParams.get("source") ?? initialSource;

  const sources = [
    { value: "all", label: t.jobsAll },
    ...ALL_SOURCES.map((value) => ({
      value,
      label: SOURCE_LABEL[value as JobSource],
    })),
  ];

  function go(nextQ: string, nextSource: string = source) {
    const href = jobsHref(nextQ, nextSource);
    if (href === `${window.location.pathname}${window.location.search}`) {
      window.location.reload();
      return;
    }
    window.location.assign(href);
  }

  function currentQuery() {
    return inputRef.current?.value ?? q;
  }

  function runSearch(raw: string) {
    go(raw, source);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runSearch(currentQuery());
  }

  function onSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    runSearch(e.currentTarget.value);
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
          onKeyDown={onSearchKeyDown}
          onSearch={(e) => {
            e.preventDefault();
            runSearch(e.currentTarget.value);
          }}
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
              onClick={() => go(currentQuery(), s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {source !== "all" ? (
          <input type="hidden" name="source" value={source} />
        ) : null}
      </div>
      <button type="submit" className="jobs-filters__submit">
        {t.jobsFilter}
      </button>
    </form>
  );
}
