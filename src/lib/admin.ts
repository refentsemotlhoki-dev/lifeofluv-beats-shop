import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type BeatRow = Tables<"beats">;
export type OrderRow = Tables<"orders">;

const BUCKET = "beats";

export async function isAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_admin");
  return !error && data === true;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listAllBeats(): Promise<BeatRow[]> {
  const { data, error } = await supabase
    .from("beats")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBeatRow(slug: string): Promise<BeatRow | null> {
  const { data, error } = await supabase.from("beats").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function saveBeat(row: TablesInsert<"beats">): Promise<void> {
  const { error } = await supabase.from("beats").upsert(row, { onConflict: "slug" });
  if (error) throw new Error(error.message);
}

function storagePathFromUrl(url: string | null): string | null {
  if (!url) return null;
  const marker = `/object/public/${BUCKET}/`;
  const at = url.indexOf(marker);
  if (at === -1) return null;
  return decodeURIComponent(url.slice(at + marker.length).split("?")[0] ?? "");
}

export async function deleteBeat(beat: BeatRow): Promise<void> {
  const { error } = await supabase.from("beats").delete().eq("slug", beat.slug);
  if (error) throw new Error(error.message);
  const paths = [storagePathFromUrl(beat.preview_url), storagePathFromUrl(beat.artwork_url)].filter(
    (p): p is string => Boolean(p),
  );
  if (paths.length > 0) await supabase.storage.from(BUCKET).remove(paths);
}

export async function uploadBeatFile(
  slug: string,
  file: File,
  kind: "audio" | "artwork",
): Promise<string> {
  const dot = file.name.lastIndexOf(".");
  const ext = dot === -1 ? "" : file.name.slice(dot + 1).toLowerCase();
  const key = `${slug}${kind === "artwork" ? "-art" : ""}${ext ? `.${ext}` : ""}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(key, file, file.type ? { upsert: true, contentType: file.type } : { upsert: true });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
  return `${data.publicUrl}?v=${Date.now()}`;
}

export async function listOrders(limit?: number): Promise<OrderRow[]> {
  let query = supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}
