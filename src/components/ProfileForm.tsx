"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  EMPTY_PROFILE,
  isProfileReady,
  loadProfile,
  saveProfile,
  type Profile,
} from "@/lib/profile";

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setHydrated(true);
  }, []);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    saveProfile(profile);
    setSaved(true);
  }

  if (!hydrated) {
    return <p className="muted">Loading profile…</p>;
  }

  const ready = isProfileReady(profile);

  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <div className="profile-form__status" data-ready={ready}>
        {ready
          ? "Profile ready for one-click apply"
          : "Name, email, or resume link still missing"}
      </div>

      <div className="profile-grid">
        <Field label="Full name" htmlFor="fullName">
          <input
            id="fullName"
            value={profile.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            required
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            value={profile.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        <Field label="Location / timezone" htmlFor="location">
          <input
            id="location"
            value={profile.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="GMT-5, Latam, Spain…"
          />
        </Field>
        <Field label="Role you’re looking for" htmlFor="role">
          <input
            id="role"
            value={profile.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="Frontend engineer, Product designer…"
          />
        </Field>
        <Field label="Key skills" htmlFor="skills">
          <input
            id="skills"
            value={profile.skills}
            onChange={(e) => update("skills", e.target.value)}
            placeholder="React, TypeScript, Figma…"
          />
        </Field>
        <Field label="LinkedIn" htmlFor="linkedin">
          <input
            id="linkedin"
            value={profile.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/…"
          />
        </Field>
        <Field label="Portfolio" htmlFor="portfolio">
          <input
            id="portfolio"
            value={profile.portfolio}
            onChange={(e) => update("portfolio", e.target.value)}
          />
        </Field>
        <Field label="Resume (public URL)" htmlFor="resumeUrl" wide>
          <input
            id="resumeUrl"
            value={profile.resumeUrl}
            onChange={(e) => update("resumeUrl", e.target.value)}
            placeholder="Google Drive, Dropbox, Notion…"
            required
          />
        </Field>
        <Field label="Cover letter template" htmlFor="coverLetter" wide>
          <textarea
            id="coverLetter"
            rows={10}
            value={profile.coverLetter}
            onChange={(e) => update("coverLetter", e.target.value)}
          />
          <p className="field-hint">
            Variables: {"{{title}}"}, {"{{company}}"}, {"{{skills}}"},{" "}
            {"{{linkedin}}"}, {"{{resume}}"}, {"{{name}}"}, {"{{email}}"},{" "}
            {"{{role}}"}
          </p>
        </Field>
      </div>

      <div className="profile-form__footer">
        <button type="submit" className="btn btn--primary">
          Save profile
        </button>
        {saved ? <span className="save-flash">Saved on this device</span> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  wide,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`field${wide ? " field--wide" : ""}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
