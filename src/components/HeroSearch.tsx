"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function HeroSearch() {
  const router = useRouter();
  const { t } = useI18n();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/jobs?q=${encodeURIComponent(query)}` : "/jobs");
  }

  return (
    <form className="hero-search" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="hero-q">
        {t.heroSearchLabel}
      </label>
      <input
        id="hero-q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.heroSearchPlaceholder}
        autoComplete="off"
      />
      <button type="submit">{t.heroSearchButton}</button>
    </form>
  );
}
