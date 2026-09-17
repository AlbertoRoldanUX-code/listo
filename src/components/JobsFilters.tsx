"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const sources = [
  { value: "all", label: "All" },
  { value: "remotive", label: "Remotive" },
  { value: "jobicy", label: "Jobicy" },
  { value: "himalayas", label: "Himalayas" },
];

export function JobsFilters({
  initialQ = "",
  initialSource = "all",
}: {
  initialQ?: string;
  initialSource?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initialQ);
  const [source, setSource] = useState(initialSource);

  function apply(nextQ: string, nextSource: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQ.trim()) params.set("q", nextQ.trim());
    else params.delete("q");
    if (nextSource && nextSource !== "all") params.set("source", nextSource);
    else params.delete("source");
    router.push(`/empleos?${params.toString()}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    apply(q, source);
  }

  return (
    <form className="jobs-filters" onSubmit={onSubmit}>
      <div className="jobs-filters__search">
        <label htmlFor="jobs-q">Search</label>
        <input
          id="jobs-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Keyword, stack, role…"
        />
      </div>
      <div className="jobs-filters__source">
        <span id="source-label">Source</span>
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
        Filter
      </button>
    </form>
  );
}
