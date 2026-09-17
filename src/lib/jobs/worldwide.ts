/** Locations that mean no country/region restriction. */
const WORLDWIDE_EXACT = new Set([
  "worldwide",
  "world wide",
  "anywhere",
  "anywhere in the world",
  "global",
  "remoto",
  "remote",
  "fully remote",
  "work from anywhere",
  "wfa",
  "unlimited",
  "no restriction",
  "no restrictions",
]);

function normalizeLocation(location: string): string {
  return location
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[|/·•,_]+/g, " ")
    .replace(/[–—−-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when the posting looks open to candidates anywhere (not geo-locked). */
export function isWorldwideLocation(location: string): boolean {
  const n = normalizeLocation(location);
  if (!n) return true;
  if (WORLDWIDE_EXACT.has(n)) return true;
  if (/^(remote|remoto)\s+(worldwide|anywhere|global)$/.test(n)) return true;
  if (/^(worldwide|anywhere|global)(\s+(remote|remoto))?$/.test(n)) return true;
  return false;
}
