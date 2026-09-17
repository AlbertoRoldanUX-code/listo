"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { SOURCE_LABEL } from "@/lib/jobs/labels";
import type { JobSource } from "@/lib/jobs/types";
import { ALL_SOURCES } from "@/lib/jobs/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function JobsFilters({
  initialQ = "",
  initialSource = "all",
}: {
  initialQ?: string;
  initialSource?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [q, setQ] = useState(initialQ);
  const [source, setSource] = useState(initialSource);

  const sources = [
    { value: "all", label: t.jobsAll },
    ...ALL_SOURCES.map((value) => ({
      value,
      label: SOURCE_LABEL[value as JobSource],
    })),
  ];

  function apply(nextQ: string, nextSource: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQ.trim()) params.set("q", nextQ.trim());
    else params.delete("q");
    if (nextSource && nextSource !== "all") params.set("source", nextSource);
    else params.delete("source");
    router.push(`/jobs?${params.toString()}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    apply(q, source);
  }

  return (
    <form className="jobs-filters" onSubmit={onSubmit}>
      <div className="jobs-filters__search">
        <label htmlFor="jobs-q">{t.jobsSearch}</label>
        <input
          id="jobs-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.jobsSearchPlaceholder}
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
              onClick={() => {
                setSource(s.value);
                apply(q, s.value);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="jobs-filters__submit">
        {t.jobsFilter}
      </button>
    </form>
  );
}
