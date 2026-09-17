export type TimezoneOption = {
  id: string;
  label: string;
  offsetMinutes: number;
};

const FALLBACK_ZONES = [
  "Pacific/Honolulu",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Atlantic/Azores",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Athens",
  "Europe/Istanbul",
  "Asia/Tbilisi",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function listZoneIds(): string[] {
  try {
    if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
      return Intl.supportedValuesOf("timeZone");
    }
  } catch {
    /* ignore */
  }
  return FALLBACK_ZONES;
}

function offsetMinutesFor(timeZone: string, at: Date): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(at);
    const raw = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
    if (raw === "GMT" || raw === "UTC") return 0;
    const match = raw.match(/^(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?$/i);
    if (match) {
      const sign = match[1] === "-" ? -1 : 1;
      const hours = Number(match[2]);
      const mins = Number(match[3] ?? "0");
      return sign * (hours * 60 + mins);
    }
  } catch {
    /* fall through */
  }

  // Fallback for engines without shortOffset
  const utc = new Date(at.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(at.toLocaleString("en-US", { timeZone }));
  return Math.round((local.getTime() - utc.getTime()) / 60_000);
}

function formatGmt(offsetMinutes: number): string {
  if (offsetMinutes === 0) return "GMT";
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  return mins === 0
    ? `GMT${sign}${hours}`
    : `GMT${sign}${hours}:${String(mins).padStart(2, "0")}`;
}

function cityLabel(timeZone: string): string {
  const leaf = timeZone.split("/").pop() ?? timeZone;
  return leaf.replaceAll("_", " ");
}

export function formatTimezoneLabel(timeZone: string, at = new Date()): string {
  const offset = offsetMinutesFor(timeZone, at);
  return `${formatGmt(offset)} · ${cityLabel(timeZone)}`;
}

export function getDetectedTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

let cached: TimezoneOption[] | null = null;

export function getTimezoneOptions(): TimezoneOption[] {
  if (cached) return cached;
  const at = new Date();
  cached = listZoneIds()
    .map((id) => {
      const offsetMinutes = offsetMinutesFor(id, at);
      return {
        id,
        label: `${formatGmt(offsetMinutes)} · ${cityLabel(id)} (${id})`,
        offsetMinutes,
      };
    })
    .sort(
      (a, b) =>
        a.offsetMinutes - b.offsetMinutes || a.label.localeCompare(b.label),
    );
  return cached;
}

/** True when the saved value is an IANA zone id we can select. */
export function isKnownTimezone(value: string): boolean {
  if (!value) return false;
  return getTimezoneOptions().some((z) => z.id === value);
}
