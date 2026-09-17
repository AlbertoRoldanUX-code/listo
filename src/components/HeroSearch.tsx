"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";

export function HeroSearch() {
  const { t } = useI18n();

  return (
    <form className="hero-search" action="/jobs" method="get">
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
      />
      <button type="submit">{t.heroSearchButton}</button>
    </form>
  );
}
