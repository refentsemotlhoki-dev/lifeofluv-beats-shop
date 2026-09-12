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
  preview: string | null;
  exclusiveSold?: boolean;
};
