import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { saveBeat, slugExists, slugify, uploadBeatFile, type BeatRow } from "@/lib/admin";
import {
  formatQuickInfo,
  parseQuickInfo,
  randomDescription,
  randomMoodTags,
} from "@/lib/beat-quick-entry";

const inputClass =
  "mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ring";

export function BeatForm({ initial }: { initial?: BeatRow }) {
  const navigate = useNavigate();
  const editing = Boolean(initial);

  const [quickInfo, setQuickInfo] = useState(
    initial ? formatQuickInfo(initial.title, initial.key, initial.bpm) : "",
  );
  const [mood, setMood] = useState<string[]>(initial?.mood ?? []);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [exclusiveSold, setExclusiveSold] = useState(initial?.exclusive_sold ?? false);
  const [audio, setAudio] = useState<File | null>(null);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const parsed = parseQuickInfo(quickInfo);
  const artworkPreview = artwork ? URL.createObjectURL(artwork) : initial?.artwork_url;

  function shuffleFiller() {
    if (!parsed) return;
    const moods = randomMoodTags();
    setMood(moods);
    setDescription(randomDescription(moods, parsed.key, parsed.bpm));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!parsed) {
      return setError('Type it as "Title | Key BPMbpm", e.g. "Shrimp | Gm 157bpm".');
    }
    if (!editing && (!audio || !artwork)) {
      return setError("Audio and artwork are required.");
    }

    setBusy(true);
    try {
      let moodTags = mood;
      let finalDescription = description;
      if (moodTags.length === 0 || !finalDescription) {
        moodTags = randomMoodTags();
        finalDescription = randomDescription(moodTags, parsed.key, parsed.bpm);
      }

      let finalSlug = initial?.slug ?? slugify(parsed.title);
      if (!editing) {
        let candidate = finalSlug;
        let suffix = 2;
        while (await slugExists(candidate)) {
          candidate = `${finalSlug}-${suffix}`;
          suffix += 1;
        }
        finalSlug = candidate;
      }

      let previewUrl = initial?.preview_url ?? null;
      let artworkUrl = initial?.artwork_url ?? "";
      if (audio) {
        setStatus("Uploading audio…");
        previewUrl = await uploadBeatFile(finalSlug, audio, "audio");
      }
      if (artwork) {
        setStatus("Uploading artwork…");
        artworkUrl = await uploadBeatFile(finalSlug, artwork, "artwork");
      }
      setStatus("Saving…");
      await saveBeat({
        slug: finalSlug,
        title: parsed.title,
        bpm: parsed.bpm,
        key: parsed.key,
        mood: moodTags,
        description: finalDescription,
        artwork_url: artworkUrl,
        preview_url: previewUrl,
        exclusive_sold: exclusiveSold,
      });
      await navigate({ to: "/admin/beats" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
      setStatus("");
    }
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-5">
      <label className="block">
        <span className="eyebrow">Title | Key BPM</span>
        <input
          className={inputClass}
          placeholder="Shrimp | Gm 157bpm"
          value={quickInfo}
          onChange={(e) => setQuickInfo(e.target.value)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {parsed
            ? `Got it: "${parsed.title}" — ${parsed.key}, ${parsed.bpm} BPM.`
            : 'Format: "Title | Key BPMbpm" — e.g. "Shrimp | Gm 157bpm".'}
        </p>
      </label>

      <label className="block">
        <span className="eyebrow">Audio {editing ? "(leave empty to keep current)" : ""}</span>
        <input
          className={inputClass}
          type="file"
          accept="audio/*,.wav,.mp3,.m4a,.mp4,.flac,.aiff"
          onChange={(e) => setAudio(e.target.files?.[0] ?? null)}
        />
      </label>
      <label className="block">
        <span className="eyebrow">Artwork {editing ? "(leave empty to keep current)" : ""}</span>
        <input
          className={inputClass}
          type="file"
          accept="image/*"
          onChange={(e) => setArtwork(e.target.files?.[0] ?? null)}
        />
      </label>
      {artworkPreview ? (
        <img src={artworkPreview} alt="Artwork preview" className="h-40 w-40 rounded-sm object-cover" />
      ) : null}

      <div className="velvet-panel rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Tags &amp; description (auto-filled)</span>
          <button
            type="button"
            className="text-xs underline disabled:opacity-40"
            disabled={!parsed}
            onClick={shuffleFiller}
          >
            Shuffle
          </button>
        </div>
        <p className="mt-3 text-sm">{mood.length > 0 ? mood.join(" / ") : "Not generated yet — hit Shuffle."}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description || "—"}</p>
      </div>

      <label className="flex items-center gap-3">
        <input type="checkbox" checked={exclusiveSold} onChange={(e) => setExclusiveSold(e.target.checked)} />
        <span className="text-sm">Exclusive sold (removes the beat from sale)</span>
      </label>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
      <button type="submit" className="btn-base btn-platinum" disabled={busy}>
        {busy ? "Working…" : editing ? "Save changes" : "Create beat"}
      </button>
    </form>
  );
}
