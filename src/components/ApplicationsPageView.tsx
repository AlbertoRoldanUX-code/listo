"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";

export function ApplicationsPageView() {
  const { t } = useI18n();
  return (
    <div className="page-head">
      <h1>{t.appsTitle}</h1>
      <p>{t.appsSub}</p>
    </div>
  );
}
