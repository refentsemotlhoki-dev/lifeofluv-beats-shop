export const PRICES = {
  basic: 20,
  lease: 99,
  exclusive: 399,
} as const;
export type Licence = "basic" | "lease" | "exclusive";

export type Beat = {
  slug: string;
  title: string;
  bpm: number;
  key: string;
  mood: string[];
  description: string;
  artwork: string;
  preview: string | null;
  exclusiveSold?: boolean;
};
