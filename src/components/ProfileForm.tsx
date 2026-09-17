"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  EMPTY_PROFILE,
  isProfileReady,
  loadProfile,
  saveProfile,
  type Profile,
} from "@/lib/profile";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import {
  formatTimezoneLabel,
  getDetectedTimezone,
  getTimezoneOptions,
  isKnownTimezone,
} from "@/lib/timezones";

export function ProfileForm() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const timezones = useMemo(() => getTimezoneOptions(), []);
  const detected = useMemo(() => getDetectedTimezone(), []);

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
    return <p className="muted">{t.profileLoading}</p>;
  }

  const ready = isProfileReady(profile);
  const locationIsCustom =
    Boolean(profile.location) && !isKnownTimezone(profile.location);
  const selectValue = locationIsCustom ? "__custom__" : profile.location;

  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <div className="profile-form__status" data-ready={ready}>
        {ready ? t.profileReady : t.profileMissing}
      </div>

      <div className="profile-grid">
        <Field label={t.fieldFullName} htmlFor="fullName">
          <input
            id="fullName"
            value={profile.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            required
          />
        </Field>
        <Field label={t.fieldEmail} htmlFor="email">
          <input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </Field>
        <Field label={t.fieldPhone} htmlFor="phone">
          <input
            id="phone"
            value={profile.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        <Field label={t.fieldLocation} htmlFor="location">
          <div className="timezone-field">
            <select
              id="location"
              value={selectValue}
              onChange={(e) => {
                const next = e.target.value;
                if (next === "__custom__") return;
                update("location", next);
              }}
            >
              <option value="">{t.fieldLocationPh}</option>
              <optgroup label={t.fieldLocationSuggested}>
                <option value={detected}>
                  {formatTimezoneLabel(detected)} ({detected})
                </option>
              </optgroup>
              <optgroup label={t.fieldLocationAll}>
                {timezones.map((tz) => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </optgroup>
              {locationIsCustom ? (
                <option value="__custom__">{profile.location}</option>
              ) : null}
            </select>
            <button
              type="button"
              className="btn btn--ghost timezone-field__detect"
              onClick={() => update("location", detected)}
            >
              {t.fieldLocationDetect}
            </button>
          </div>
        </Field>
        <Field label={t.fieldRole} htmlFor="role">
          <input
            id="role"
            value={profile.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder={t.fieldRolePh}
          />
        </Field>
        <Field label={t.fieldSkills} htmlFor="skills">
          <input
            id="skills"
            value={profile.skills}
            onChange={(e) => update("skills", e.target.value)}
            placeholder={t.fieldSkillsPh}
          />
        </Field>
        <Field label={t.fieldLinkedin} htmlFor="linkedin">
          <input
            id="linkedin"
            value={profile.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/…"
          />
        </Field>
        <Field label={t.fieldPortfolio} htmlFor="portfolio">
          <input
            id="portfolio"
            value={profile.portfolio}
            onChange={(e) => update("portfolio", e.target.value)}
          />
        </Field>
        <Field label={t.fieldResume} htmlFor="resumeUrl" wide>
          <input
            id="resumeUrl"
            value={profile.resumeUrl}
            onChange={(e) => update("resumeUrl", e.target.value)}
            placeholder={t.fieldResumePh}
            required
          />
        </Field>
        <Field label={t.fieldCover} htmlFor="coverLetter" wide>
          <textarea
            id="coverLetter"
            rows={10}
            value={profile.coverLetter}
            onChange={(e) => update("coverLetter", e.target.value)}
          />
          <p className="field-hint">{t.fieldVariables}</p>
        </Field>
      </div>

      <div className="profile-form__footer">
        <button type="submit" className="btn btn--primary">
          {t.profileSave}
        </button>
        {saved ? <span className="save-flash">{t.profileSaved}</span> : null}
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
