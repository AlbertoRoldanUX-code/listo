"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { applyToJob, saveJobForLater } from "@/lib/apply";
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
    if (!profile?.coverLetter.trim()) return "";
    return buildCoverLetter(profile, job);
  }, [profile, job]);

  const ready = profile ? isProfileReady(profile) : false;
  const hasLetter = Boolean(letter.trim());

  async function copyLetter() {
    if (!letter) return;
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function applyEasy() {
    applyToJob(job);
    setDone(true);
  }

  function saveForLater() {
    saveJobForLater(job);
    setDone(true);
  }

  if (!profile) {
    return <div className="easy-apply easy-apply--loading">{t.easyLoading}</div>;
  }

  return (
    <aside className="easy-apply" id="apply">
      <h2>{t.easyTitle}</h2>
      <p>{t.easyBody}</p>

      <div className="easy-apply__actions">
        <button type="button" className="btn btn--primary" onClick={applyEasy}>
          {t.easyApplyNow}
        </button>
        <button type="button" className="btn btn--ghost" onClick={saveForLater}>
          {t.easySaveLater}
        </button>
      </div>

      {!ready ? (
        <div className="easy-apply__warn">
          <p>{t.easyWarn}</p>
          <Link href="/profile" className="btn btn--ghost">
            {t.easyCompleteProfile}
          </Link>
        </div>
      ) : null}

      {ready && hasLetter ? (
        <>
          <label htmlFor="cover-preview">{t.easyLetterLabel}</label>
          <p className="field-hint">{t.easyLetterHint}</p>
          <textarea id="cover-preview" readOnly rows={10} value={letter} />
          <div className="easy-apply__actions">
            <button type="button" className="btn btn--ghost" onClick={copyLetter}>
              {copied ? t.easyCopied : t.easyCopyOnly}
            </button>
          </div>
        </>
      ) : null}

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
