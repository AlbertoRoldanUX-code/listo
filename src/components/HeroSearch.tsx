"use client";

import { FormEvent, KeyboardEvent, useRef } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function HeroSearch() {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  function go(query: string) {
    const trimmed = query.trim();
    const href = trimmed ? `/jobs?q=${encodeURIComponent(trimmed)}` : "/jobs";
    window.location.assign(href);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    go(inputRef.current?.value ?? "");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    go(e.currentTarget.value);
  }

  return (
    <form className="hero-search" action="/jobs" method="get" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="hero-q">
        {t.heroSearchLabel}
      </label>
      <input
        ref={inputRef}
        id="hero-q"
        name="q"
        type="search"
        defaultValue=""
        onKeyDown={onKeyDown}
        onSearch={(e) => {
          e.preventDefault();
          go(e.currentTarget.value);
        }}
        placeholder={t.heroSearchPlaceholder}
        autoComplete="off"
        enterKeyHint="search"
      />
      <button type="submit">{t.heroSearchButton}</button>
    </form>
  );
}
