"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function HeroSearch() {
  const { t } = useI18n();
  const [isSearching, setIsSearching] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSearching(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const q = String(data.get("q") ?? "").trim();
    const href = q ? `/jobs?q=${encodeURIComponent(q)}` : "/jobs";
    window.location.assign(href);
  }

  return (
    <form className="hero-search" action="/jobs" method="get" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="hero-q">
        {t.heroSearchLabel}
      </label>
      <input
        id="hero-q"
        name="q"
        type="search"
        placeholder={t.heroSearchPlaceholder}
        autoComplete="off"
        enterKeyHint="search"
        disabled={isSearching}
      />
      <button type="submit" disabled={isSearching} aria-busy={isSearching}>
        {isSearching ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            <span className="sr-only">{t.jobsSearching}</span>
          </>
        ) : (
          t.heroSearchButton
        )}
      </button>
    </form>
  );
}
