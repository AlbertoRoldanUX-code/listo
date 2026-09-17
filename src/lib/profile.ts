export type Profile = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  resumeUrl: string;
  location: string;
  role: string;
  skills: string;
  coverLetter: string;
};

export const EMPTY_PROFILE: Profile = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  portfolio: "",
  resumeUrl: "",
  location: "",
  role: "",
  skills: "",
  coverLetter:
    "Hi,\n\nI’m interested in the {{title}} role at {{company}}. I have experience in {{skills}} and I’m looking for a remote role where I can contribute right away.\n\nYou can review my profile here: {{linkedin}}\nResume: {{resume}}\n\nThanks,\n{{name}}",
};

const PROFILE_KEY = "listo-profile";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return EMPTY_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return EMPTY_PROFILE;
    return { ...EMPTY_PROFILE, ...JSON.parse(raw) };
  } catch {
    return EMPTY_PROFILE;
  }
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function isProfileReady(profile: Profile): boolean {
  return Boolean(profile.fullName && profile.email && profile.resumeUrl);
}

export function buildCoverLetter(
  profile: Profile,
  job: { title: string; company: string },
): string {
  return profile.coverLetter
    .replaceAll("{{title}}", job.title)
    .replaceAll("{{company}}", job.company)
    .replaceAll("{{skills}}", profile.skills || "my field")
    .replaceAll("{{linkedin}}", profile.linkedin || "—")
    .replaceAll("{{resume}}", profile.resumeUrl || "—")
    .replaceAll("{{name}}", profile.fullName || "Applicant")
    .replaceAll("{{email}}", profile.email || "")
    .replaceAll("{{role}}", profile.role || "");
}
