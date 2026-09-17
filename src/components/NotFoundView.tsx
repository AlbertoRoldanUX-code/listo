"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function NotFoundView() {
  const { t } = useI18n();
  return (
    <div className="page-head">
      <h1>{t.notFoundTitle}</h1>
      <p>{t.notFoundBody}</p>
      <p style={{ marginTop: "1.25rem" }}>
        <Link href="/jobs" className="btn btn--primary">
          {t.notFoundCta}
        </Link>
      </p>
    </div>
  );
}
