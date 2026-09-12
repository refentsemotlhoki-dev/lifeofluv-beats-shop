// Supabase Edge Function: trello-beat-ingest
//
// Scheduled by pg_cron (see the accompanying migration). On each run:
// reads open cards in the Trello "Current Request" list, validates each
// against the card contract below, and for a valid card uploads its audio
// + artwork attachments to the public "beats" storage bucket, upserts a
// row into public.beats (keyed by trello_card_id — safe to re-run), and
// drags the card to "Waiting approval". An invalid card gets a comment
// explaining what's missing and is left in place — nothing incomplete
// ever goes live.
//
// Card contract (parsed from the card description, one "Key: value" per
// line — not Trello Custom Fields, since that wasn't confirmed available):
//   BPM: 155
//   Key: E minor
//   Mood: Moody, Trap, Upbeat
//   Licence: available            (or: exclusive-sold)
//   Description: A driving trap groove with a moody edge.
// Plus exactly one audio attachment and one image attachment on the card.

import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TRELLO_API_KEY = Deno.env.get("TRELLO_API_KEY")!;
const TRELLO_TOKEN = Deno.env.get("TRELLO_TOKEN")!;
const TRELLO_LIST_CURRENT_REQUEST_ID = Deno.env.get("TRELLO_LIST_CURRENT_REQUEST_ID")!;
const TRELLO_LIST_WAITING_APPROVAL_ID = Deno.env.get("TRELLO_LIST_WAITING_APPROVAL_ID")!;
const INGEST_CRON_SECRET = Deno.env.get("INGEST_CRON_SECRET")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const TRELLO_API = "https://api.trello.com/1";
const trelloAuth = `key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;

type TrelloAttachment = {
  id: string;
  url: string;
  name: string;
  mimeType: string | null;
};

type TrelloCard = {
  id: string;
  name: string;
  desc: string;
  attachments: TrelloAttachment[];
};

async function fetchCurrentRequestCards(): Promise<TrelloCard[]> {
  const res = await fetch(
    `${TRELLO_API}/lists/${TRELLO_LIST_CURRENT_REQUEST_ID}/cards?attachments=true&fields=name,desc&${trelloAuth}`,
  );
  if (!res.ok) throw new Error(`Failed to list Trello cards: ${res.status} ${await res.text()}`);
  return res.json();
}

async function commentOnCard(cardId: string, text: string) {
  await fetch(`${TRELLO_API}/cards/${cardId}/actions/comments?${trelloAuth}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

async function moveCardToWaitingApproval(cardId: string) {
  const res = await fetch(
    `${TRELLO_API}/cards/${cardId}?idList=${TRELLO_LIST_WAITING_APPROVAL_ID}&${trelloAuth}`,
    { method: "PUT" },
  );
  if (!res.ok) throw new Error(`Failed to move card ${cardId}: ${res.status} ${await res.text()}`);
}

async function downloadAttachment(attachment: TrelloAttachment): Promise<Uint8Array> {
  const res = await fetch(attachment.url, {
    headers: { Authorization: `OAuth oauth_consumer_key="${TRELLO_API_KEY}", oauth_token="${TRELLO_TOKEN}"` },
  });
  if (!res.ok) throw new Error(`Failed to download attachment ${attachment.name}: ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

function extensionOf(attachment: TrelloAttachment): string {
  const dot = attachment.name.lastIndexOf(".");
  return dot === -1 ? "" : attachment.name.slice(dot + 1).toLowerCase();
}

const AUDIO_EXTENSIONS = ["wav", "mp3", "m4a", "aiff", "flac"];
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

function isAudio(a: TrelloAttachment) {
  return a.mimeType?.startsWith("audio/") || AUDIO_EXTENSIONS.includes(extensionOf(a));
}
function isImage(a: TrelloAttachment) {
  return a.mimeType?.startsWith("image/") || IMAGE_EXTENSIONS.includes(extensionOf(a));
}

function parseField(desc: string, field: string): string | null {
  const match = new RegExp(`^${field}:\\s*(.+)$`, "im").exec(desc);
  return match ? match[1].trim() : null;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ValidationResult =
  | { ok: true; bpm: number; key: string; mood: string[]; licence: "available" | "exclusive-sold"; description: string; audio: TrelloAttachment; image: TrelloAttachment }
  | { ok: false; problems: string[] };

function validateCard(card: TrelloCard): ValidationResult {
  const problems: string[] = [];

  if (!card.name.trim()) problems.push("Card title is empty (used as the beat title).");

  const bpmRaw = parseField(card.desc, "BPM");
  const bpm = bpmRaw ? Number.parseInt(bpmRaw, 10) : NaN;
  if (!bpmRaw || Number.isNaN(bpm) || bpm <= 0) problems.push('Missing or invalid "BPM: <number>" line.');

  const key = parseField(card.desc, "Key");
  if (!key) problems.push('Missing "Key: <value>" line.');

  const moodRaw = parseField(card.desc, "Mood");
  const mood = moodRaw ? moodRaw.split(",").map((m) => m.trim()).filter(Boolean) : [];
  if (mood.length === 0) problems.push('Missing "Mood: tag1, tag2" line.');

  const licenceRaw = parseField(card.desc, "Licence")?.toLowerCase();
  const licence = licenceRaw === "exclusive-sold" ? "exclusive-sold" : licenceRaw === "available" ? "available" : null;
  if (!licence) problems.push('Missing or invalid "Licence: available" or "Licence: exclusive-sold" line.');

  const description = parseField(card.desc, "Description");
  if (!description) problems.push('Missing "Description: ..." line.');

  const audioMatches = card.attachments.filter(isAudio);
  const imageMatches = card.attachments.filter(isImage);
  if (audioMatches.length !== 1) problems.push(`Expected exactly 1 audio attachment, found ${audioMatches.length}.`);
  if (imageMatches.length !== 1) problems.push(`Expected exactly 1 image attachment, found ${imageMatches.length}.`);

  if (problems.length > 0) return { ok: false, problems };

  return {
    ok: true,
    bpm,
    key: key!,
    mood,
    licence: licence as "available" | "exclusive-sold",
    description: description!,
    audio: audioMatches[0],
    image: imageMatches[0],
  };
}

async function processCard(card: TrelloCard): Promise<string> {
  // Idempotency: if this card already produced a beat row, don't re-upload —
  // just make sure it's actually moved (covers a prior run that succeeded up
  // to the DB write but failed to move the card).
  const { data: existing } = await supabase
    .from("beats")
    .select("slug")
    .eq("trello_card_id", card.id)
    .maybeSingle();

  if (existing) {
    await moveCardToWaitingApproval(card.id);
    return `already processed (${existing.slug}); ensured card is moved`;
  }

  const validation = validateCard(card);
  if (!validation.ok) {
    await commentOnCard(
      card.id,
      `This card is missing what's needed to publish:\n\n${validation.problems.map((p) => `- ${p}`).join("\n")}\n\nFix and it'll be picked up on the next pass.`,
    );
    return `skipped: ${validation.problems.join(" | ")}`;
  }

  let slug = slugify(card.name);
  const { data: slugCollision } = await supabase
    .from("beats")
    .select("slug, trello_card_id")
    .eq("slug", slug)
    .maybeSingle();
  if (slugCollision && slugCollision.trello_card_id !== card.id) {
    slug = `${slug}-${card.id.slice(-5)}`;
  }

  const [audioBytes, imageBytes] = await Promise.all([
    downloadAttachment(validation.audio),
    downloadAttachment(validation.image),
  ]);

  const audioExt = extensionOf(validation.audio) || "wav";
  const imageExt = extensionOf(validation.image) || "jpg";
  const audioKey = `${slug}.${audioExt}`;
  const artworkKey = `${slug}-art.${imageExt}`;

  const { error: audioUploadError } = await supabase.storage
    .from("beats")
    .upload(audioKey, audioBytes, { contentType: validation.audio.mimeType ?? "audio/wav", upsert: true });
  if (audioUploadError) throw new Error(`Audio upload failed: ${audioUploadError.message}`);

  const { error: artworkUploadError } = await supabase.storage
    .from("beats")
    .upload(artworkKey, imageBytes, { contentType: validation.image.mimeType ?? "image/jpeg", upsert: true });
  if (artworkUploadError) throw new Error(`Artwork upload failed: ${artworkUploadError.message}`);

  const { data: audioPublicUrl } = supabase.storage.from("beats").getPublicUrl(audioKey);
  const { data: artworkPublicUrl } = supabase.storage.from("beats").getPublicUrl(artworkKey);

  const { error: upsertError } = await supabase.from("beats").upsert(
    {
      slug,
      title: card.name.trim(),
      bpm: validation.bpm,
      key: validation.key,
      mood: validation.mood,
      description: validation.description,
      artwork_url: artworkPublicUrl.publicUrl,
      preview_url: audioPublicUrl.publicUrl,
      exclusive_sold: validation.licence === "exclusive-sold",
      trello_card_id: card.id,
    },
    { onConflict: "slug" },
  );
  if (upsertError) throw new Error(`Database upsert failed: ${upsertError.message}`);

  await moveCardToWaitingApproval(card.id);
  await commentOnCard(card.id, `✅ Live at /beats/${slug}`);
  return `published: ${slug}`;
}

Deno.serve(async (req: Request) => {
  if (req.headers.get("x-ingest-secret") !== INGEST_CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cards = await fetchCurrentRequestCards();
  const results: Record<string, string> = {};

  for (const card of cards) {
    try {
      results[card.name] = await processCard(card);
    } catch (err) {
      console.error(`Error processing card ${card.id} (${card.name}):`, err);
      results[card.name] = `error: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  return new Response(JSON.stringify({ processed: cards.length, results }), {
    headers: { "Content-Type": "application/json" },
  });
});
