export type Application = {
  id: string;
  jobId: string;
  title: string;
  company: string;
  applyUrl: string;
  source: string;
  status: "applied" | "saved";
  appliedAt: string;
  notes?: string;
};

const KEY = "listo-applications";

export function loadApplications(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Application[];
  } catch {
    return [];
  }
}

export function saveApplications(apps: Application[]): void {
  localStorage.setItem(KEY, JSON.stringify(apps));
}

export function upsertApplication(app: Application): Application[] {
  const apps = loadApplications();
  const idx = apps.findIndex((a) => a.jobId === app.jobId);
  if (idx >= 0) apps[idx] = app;
  else apps.unshift(app);
  saveApplications(apps);
  return apps;
}

export function removeApplication(jobId: string): Application[] {
  const apps = loadApplications().filter((a) => a.jobId !== jobId);
  saveApplications(apps);
  return apps;
}
