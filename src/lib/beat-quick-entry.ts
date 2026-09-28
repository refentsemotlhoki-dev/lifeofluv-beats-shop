// Parses the admin's one-line quick-entry format ("Shrimp | Gm 157bpm") and
// generates filler mood tags / description so the only required typing is
// that one line, plus the audio + artwork files.

export type QuickInfo = { title: string; key: string; bpm: number };

function normalizeKey(raw: string): string {
  const compact = raw.replace(/\s+/g, "");
  const match = /^([A-Ga-g])([#b]?)(maj|min|m)?$/.exec(compact);
  if (!match) return raw.trim();
  const [, letter, accidental, modeRaw] = match;
  const isMinor = modeRaw === "m" || modeRaw === "min";
  return `${(letter ?? "").toUpperCase()}${accidental ?? ""} ${isMinor ? "minor" : "major"}`;
}

export function parseQuickInfo(input: string): QuickInfo | null {
  const parts = input.split("|");
  if (parts.length < 2) return null;
  const title = parts[0]!.trim();
  const rest = parts.slice(1).join("|").trim();
  if (!title || !rest) return null;

  const bpmMatch = /(\d{2,3})\s*bpm/i.exec(rest);
  if (!bpmMatch) return null;
  const bpm = Number.parseInt(bpmMatch[1]!, 10);

  const keyRaw = rest.slice(0, bpmMatch.index).trim() || rest.replace(bpmMatch[0], "").trim();
  if (!keyRaw) return null;

  return { title, key: normalizeKey(keyRaw), bpm };
}

export function formatQuickInfo(title: string, key: string, bpm: number): string {
  return `${title} | ${key} ${bpm}bpm`;
}

const MOOD_POOL = [
  "Moody",
  "Trap",
  "Upbeat",
  "Late night",
  "Trap soul",
  "Hard",
  "Drill",
  "Melodic",
  "Anthem",
  "Club",
  "Bounce",
  "Cinematic",
  "Dark",
  "Warm",
  "R&B",
  "Chill",
  "Aggressive",
  "Dreamy",
  "Gritty",
  "Smooth",
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function randomMoodTags(count = 2): string[] {
  return shuffle(MOOD_POOL).slice(0, count);
}

const DESCRIPTION_TEMPLATES: ((moods: string[], key: string, bpm: number) => string)[] = [
  (moods, key, bpm) => `A ${moods[0]!.toLowerCase()} groove built around ${key} at ${bpm} BPM.`,
  (moods, key, bpm) => `${bpm} BPM of ${moods.join(" and ").toLowerCase()} energy in ${key}.`,
  (moods, key, bpm) => `Slow-building ${moods[0]!.toLowerCase()} textures over a ${bpm} BPM pocket in ${key}.`,
  (moods, key, bpm) => `A ${moods.join(", ").toLowerCase()} instrumental in ${key}, sitting at ${bpm} BPM.`,
  (moods, key, bpm) => `${moods[0]} drums and a ${key} progression made for a ${bpm} BPM session.`,
  (moods, key, bpm) => `Runs ${bpm} BPM in ${key} with a ${moods.join(" / ").toLowerCase()} feel throughout.`,
];

export function randomDescription(moods: string[], key: string, bpm: number): string {
  const template = DESCRIPTION_TEMPLATES[Math.floor(Math.random() * DESCRIPTION_TEMPLATES.length)]!;
  return template(moods, key, bpm);
}
