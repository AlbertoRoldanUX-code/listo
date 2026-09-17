"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";

export function ProfilePageView() {
  const { t } = useI18n();
  return (
    <div className="page-head">
      <h1>{t.profileTitle}</h1>
      <p>{t.profileSub}</p>
    </div>
  );
}
