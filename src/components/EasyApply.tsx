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

export function EasyApply({ job }: { job: Job }) {
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
    return <div className="easy-apply easy-apply--loading">Loading profile…</div>;
  }

  return (
    <aside className="easy-apply">
      <h2>Easy apply</h2>
      <p>
        Save your profile once. Here we copy the letter, open the official link,
        and log the application.
      </p>

      {!ready ? (
        <div className="easy-apply__warn">
          <p>Add your name, email, and resume to unlock the quick flow.</p>
          <Link href="/perfil" className="btn btn--primary">
            Complete profile
          </Link>
        </div>
      ) : (
        <>
          <label htmlFor="cover-preview">Letter ready to paste</label>
          <textarea id="cover-preview" readOnly rows={10} value={letter} />
          <div className="easy-apply__actions">
            <button type="button" className="btn btn--primary" onClick={applyEasy}>
              Copy and open application
            </button>
            <button type="button" className="btn btn--ghost" onClick={copyLetter}>
              {copied ? "Copied" : "Copy letter only"}
            </button>
            <button type="button" className="btn btn--ghost" onClick={saveForLater}>
              Save for later
            </button>
          </div>
        </>
      )}

      {done ? (
        <p className="easy-apply__done">
          Logged. Track it under{" "}
          <Link href="/postulaciones">Applications</Link>.
        </p>
      ) : null}

      <a
        className="easy-apply__external"
        href={job.applyUrl}
        target="_blank"
        rel="noreferrer"
      >
        Go to original posting →
      </a>
    </aside>
  );
}
