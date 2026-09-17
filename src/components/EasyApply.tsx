"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { upsertApplication } from "@/lib/applications";
import {
  buildCoverLetter,
  isProfileReady,
  loadProfile,
  type Profile,
} from "@/lib/profile";
import type { Job } from "@/lib/jobs/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function EasyApply({ job }: { job: Job }) {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const letter = useMemo(() => {
    if (!profile) return "";
    return buildCoverLetter(profile, job);
  }, [profile, job]);

  const ready = profile ? isProfileReady(profile) : false;

  async function copyLetter() {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function applyEasy() {
    if (!profile || !ready) return;
    await navigator.clipboard.writeText(letter);
    upsertApplication({
      id: crypto.randomUUID(),
      jobId: job.id,
      title: job.title,
      company: job.company,
      applyUrl: job.applyUrl,
      source: job.source,
      status: "applied",
      appliedAt: new Date().toISOString(),
    });
    setDone(true);
    window.open(job.applyUrl, "_blank", "noopener,noreferrer");
  }

  function saveForLater() {
    upsertApplication({
      id: crypto.randomUUID(),
      jobId: job.id,
      title: job.title,
      company: job.company,
      applyUrl: job.applyUrl,
      source: job.source,
      status: "saved",
      appliedAt: new Date().toISOString(),
    });
    setDone(true);
  }

  if (!profile) {
    return <div className="easy-apply easy-apply--loading">{t.easyLoading}</div>;
  }

  return (
    <aside className="easy-apply">
      <h2>{t.easyTitle}</h2>
      <p>{t.easyBody}</p>

      {!ready ? (
        <div className="easy-apply__warn">
          <p>{t.easyWarn}</p>
          <Link href="/profile" className="btn btn--primary">
            {t.easyCompleteProfile}
          </Link>
        </div>
      ) : (
        <>
          <label htmlFor="cover-preview">{t.easyLetterLabel}</label>
          <textarea id="cover-preview" readOnly rows={10} value={letter} />
          <div className="easy-apply__actions">
            <button type="button" className="btn btn--primary" onClick={applyEasy}>
              {t.easyCopyOpen}
            </button>
            <button type="button" className="btn btn--ghost" onClick={copyLetter}>
              {copied ? t.easyCopied : t.easyCopyOnly}
            </button>
            <button type="button" className="btn btn--ghost" onClick={saveForLater}>
              {t.easySaveLater}
            </button>
          </div>
        </>
      )}

      {done ? (
        <p className="easy-apply__done">
          {t.easyDone}{" "}
          <Link href="/applications">{t.navApplications}</Link>.
        </p>
      ) : null}

      <a
        className="easy-apply__external"
        href={job.applyUrl}
        target="_blank"
        rel="noreferrer"
      >
        {t.easyOriginal}
      </a>
    </aside>
  );
}
