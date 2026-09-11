
export const PRICES = {
  lease: 199,
  exclusive: 599,
} as const;

export type Beat = {
  slug: string;
  title: string;
  bpm: number;
  key: string;
  mood: string[];
  description: string;
  artwork: string;
  /** Drop an audio file URL here when the preview is ready. */
  preview: string | null;
  exclusiveSold?: boolean;
};

export const beats: Beat[] = [
  {
    slug: "velvet-hours",
    title: "Velvet Hours",
    bpm: 142,
    key: "F minor",
    mood: ["Late night", "Trap soul"],
    description:
      "Slow-burning keys under a heavy 808 glide. Room for a full verse before the drop.",
    artwork: "/images/hero-velvet.jpg",
    preview:
      "https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/velvet-hours.wav",
  },
  {
    slug: "ice-water",
    title: "Ice Water",
    bpm: 138,
    key: "C# minor",
    mood: ["Hard", "Drill"],
    description: "Sliding bass, brittle hats and a cold string line that never lets up.",
    artwork: "/images/pendant-lol.jpg",
    preview:
      "https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/ice-water.wav",
  },
  {
    slug: "north-star",
    title: "North Star",
    bpm: 90,
    key: "A minor",
    mood: ["Melodic", "Anthem"],
    description: "Wide pads and a live-feel drum break built for a hook that carries.",
    artwork: "/images/chain-galaxy.jpg",
    preview:
      "https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/north-star.wav",
  },
  {
    slug: "platinum-chain",
    title: "Platinum Chain",
    bpm: 148,
    key: "G minor",
    mood: ["Club", "Bounce"],
    description: "Bright brass stabs over a bouncing pocket. Made to be loud in a car.",
    artwork: "/images/pendant-lol.jpg",
    preview:
      "https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/platinum-chain.wav",
  },
  {
    slug: "midnight-run",
    title: "Midnight Run",
    bpm: 130,
    key: "D minor",
    mood: ["Cinematic", "Dark"],
    description: "A patient build, then a low brass hit that opens the whole track up.",
    artwork: "/images/hero-velvet.jpg",
    preview:
      "https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/midnight-run.wav",
    exclusiveSold: true,
  },
  {
    slug: "clear-skies",
    title: "Clear Skies",
    bpm: 96,
    key: "E major",
    mood: ["Warm", "R&B"],
    description: "Soft electric guitar loop, brushed drums and space for layered vocals.",
    artwork: "/images/chain-galaxy.jpg",
    preview:
      "https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/clear-skies.wav",
  },
];

export function getBeat(slug: string) {
  return beats.find((b) => b.slug === slug);
}
