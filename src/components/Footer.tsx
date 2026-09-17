"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useI18n();
  return <footer className="site-footer">{t.footer}</footer>;
}
