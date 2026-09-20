import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { saveBeat, slugify, uploadBeatFile, type BeatRow } from "@/lib/admin";

const inputClass =
  "mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ring";

export function BeatForm({ initial }: { initial?: BeatRow }) {
  const navigate = useNavigate();
  const editing = Boolean(initial);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [bpm, setBpm] = useState(initial ? String(initial.bpm) : "");
  const [key, setKey] = useState(initial?.key ?? "");
  const [mood, setMood] = useState(initial?.mood.join(", ") ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [exclusiveSold, setExclusiveSold] = useState(initial?.exclusive_sold ?? false);
  const [audio, setAudio] = useState<File | null>(null);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const artworkPreview = artwork ? URL.createObjectURL(artwork) : initial?.artwork_url;

  function onTitleChange(value: string) {
    setTitle(value);
    if (!editing && !slugTouched) setSlug(slugify(value));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const bpmNumber = Number.parseInt(bpm, 10);
    const moodTags = mood.split(",").map((m) => m.trim()).filter(Boolean);
    const finalSlug = slugify(slug);
    if (!title.trim() || !finalSlug) return setError("Title and slug are required.");
    if (!Number.isFinite(bpmNumber) || bpmNumber <= 0) return setError("BPM must be a number.");
    if (!key.trim()) return setError("Key is required.");
    if (moodTags.length === 0) return setError("Add at least one mood tag.");
    if (!description.trim()) return setError("Description is required.");
    if (!editing && (!audio || !artwork)) return setError("Audio and artwork are required.");

    setBusy(true);
    try {
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
        title: title.trim(),
        bpm: bpmNumber,
        key: key.trim(),
        mood: moodTags,
        description: description.trim(),
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
        <span className="eyebrow">Title</span>
        <input className={inputClass} value={title} onChange={(e) => onTitleChange(e.target.value)} />
      </label>
      <label className="block">
        <span className="eyebrow">Slug (URL)</span>
        <input
          className={inputClass}
          value={slug}
          disabled={editing}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
        />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">BPM</span>
          <input className={inputClass} inputMode="numeric" value={bpm} onChange={(e) => setBpm(e.target.value)} />
        </label>
        <label className="block">
          <span className="eyebrow">Key</span>
          <input className={inputClass} placeholder="E minor" value={key} onChange={(e) => setKey(e.target.value)} />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow">Mood tags (comma separated)</span>
        <input className={inputClass} placeholder="Moody, Trap, Upbeat" value={mood} onChange={(e) => setMood(e.target.value)} />
      </label>
      <label className="block">
        <span className="eyebrow">Description</span>
        <textarea className={inputClass} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={exclusiveSold} onChange={(e) => setExclusiveSold(e.target.checked)} />
        <span className="text-sm">Exclusive sold (removes the beat from sale)</span>
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
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
      <button type="submit" className="btn-base btn-platinum" disabled={busy}>
        {busy ? "Working…" : editing ? "Save changes" : "Create beat"}
      </button>
    </form>
  );
}
