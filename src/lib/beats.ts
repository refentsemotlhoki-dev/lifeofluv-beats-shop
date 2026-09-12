import { supabase } from "@/integrations/supabase/client";
import type { Beat } from "@/data/beats";

const BEAT_COLUMNS =
  "slug, title, bpm, key, mood, description, artwork_url, preview_url, exclusive_sold";

function toBeat(row: {
  slug: string;
  title: string;
  bpm: number;
  key: string;
  mood: string[];
  description: string;
  artwork_url: string;
  preview_url: string | null;
  exclusive_sold: boolean;
}): Beat {
  return {
    slug: row.slug,
    title: row.title,
    bpm: row.bpm,
    key: row.key,
    mood: row.mood,
    description: row.description,
    artwork: row.artwork_url,
    preview: row.preview_url,
    exclusiveSold: row.exclusive_sold,
  };
}

export async function getBeats(): Promise<Beat[]> {
  const { data, error } = await supabase.from("beats").select(BEAT_COLUMNS).order("created_at");
  if (error) throw new Error("Could not load beats.");
  return (data ?? []).map(toBeat);
}

export async function getBeat(slug: string): Promise<Beat | undefined> {
  const { data, error } = await supabase
    .from("beats")
    .select(BEAT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error("Could not load beat.");
  return data ? toBeat(data) : undefined;
}
