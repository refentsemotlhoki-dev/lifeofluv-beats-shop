import { Link } from "@tanstack/react-router";
import { PRICES, type Beat } from "@/data/beats";
import { PlayPreviewButton } from "@/components/audio-player";

export function BeatCard({ beat }: { beat: Beat }) {
  return (
    <Link
      to="/beats/$slug"
      params={{ slug: beat.slug }}
      className="group velvet-panel block overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={beat.artwork}
          alt={`${beat.title} artwork`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <PlayPreviewButton beat={beat} variant="icon" className="absolute bottom-4 right-4" />
        {beat.exclusiveSold ? (
          <span className="absolute left-4 top-4 rounded-sm border border-border bg-background/80 px-2 py-1 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
            Exclusive sold
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="text-xl">{beat.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {beat.bpm} BPM · {beat.key} · {beat.mood.join(" / ")}
        </p>
        <div className="hairline my-4" />
        <div className="flex items-center justify-between">
          <span className="eyebrow">From ${PRICES.lease} CAD</span>
          <span className="text-xs uppercase tracking-[0.16em] platinum-text">View beat</span>
        </div>
      </div>
    </Link>
  );
}
