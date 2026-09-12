import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBeat, PRICES } from "@/data/beats";
import { PlayPreviewButton } from "@/components/audio-player";

export const Route = createFileRoute("/beats/$slug")({
  loader: ({ params }) => {
    const beat = getBeat(params.slug);
    if (!beat) throw notFound();
    return { beat };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Beat unavailable — LifeOfLuv" }, { name: "robots", content: "noindex" }],
      };
    }
    const { beat } = loaderData;
    const description = `${beat.title} — ${beat.bpm} BPM, ${beat.key}. Unlimited Lease $${PRICES.lease} CAD or Exclusive $${PRICES.exclusive} CAD.`;
    return {
      meta: [
        { title: `${beat.title} — Beat by LifeOfLuv` },
        { name: "description", content: description },
        { property: "og:title", content: `${beat.title} — Beat by LifeOfLuv` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: BeatPage,
});

function BeatPage() {
  const { beat } = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <Link to="/beats" className="eyebrow hover:text-foreground">
        ← Beat Store
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="velvet-panel overflow-hidden rounded-lg">
            <img
              src={beat.artwork}
              alt={`${beat.title} artwork`}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="velvet-panel mt-6 rounded-lg p-5">
            <p className="eyebrow">Preview</p>
            <div className="mt-4">
              <PlayPreviewButton beat={beat} />
            </div>
            {beat.preview ? (
              <audio controls src={beat.preview} className="mt-4 w-full">
                Your browser does not support audio playback.
              </audio>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                The audio preview for this beat is being uploaded. Check back shortly.
              </p>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl">{beat.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {beat.bpm} BPM · {beat.key} · {beat.mood.join(" / ")}
          </p>
          <p className="mt-6 text-lg text-muted-foreground">{beat.description}</p>

          <div className="hairline my-8" />

          <div className="velvet-panel rounded-lg p-6">
            <p className="eyebrow">Unlimited Lease — ${PRICES.lease} CAD</p>
            <p className="mt-4 text-muted-foreground">
              Release your music with a broad, non-exclusive licence. You can use the beat in your
              project while LifeOfLuv may continue licensing it to other artists.
            </p>
            {beat.exclusiveSold ? (
              <p className="mt-6 text-sm text-muted-foreground">
                This beat's Exclusive licence has been sold, so it's no longer available for new
                licences of any kind.
              </p>
            ) : (
              <Link
                to="/checkout/$slug"
                params={{ slug: beat.slug }}
                search={{ licence: "lease" }}
                className="btn-base btn-platinum mt-6"
              >
                Get Unlimited Lease
              </Link>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              A simple choice for artists ready to record, release, and move.
            </p>
          </div>

          <div className="velvet-panel mt-6 rounded-lg p-6">
            <p className="eyebrow">Exclusive — ${PRICES.exclusive} CAD</p>
            <p className="mt-4 text-muted-foreground">
              Secure an exclusive licence for future licensing. Once sold, this beat is removed from
              LifeOfLuv's store for new licences. Artists who bought a licence before your purchase
              keep their valid rights.
            </p>
            {beat.exclusiveSold ? (
              <p className="mt-6 text-sm text-muted-foreground">
                The Exclusive for this beat has been sold. New Exclusive licences are no longer
                offered.
              </p>
            ) : (
              <Link
                to="/checkout/$slug"
                params={{ slug: beat.slug }}
                search={{ licence: "exclusive" }}
                className="btn-base btn-platinum mt-6"
              >
                Secure Exclusive
              </Link>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              For artists who want the beat taken off the market going forward.
            </p>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Your purchase includes the applicable licence agreement. Please read it before you buy;
            the agreement controls if there is a difference between the store copy and the licence
            terms.{" "}
            <Link to="/licences" className="underline hover:text-foreground">
              Compare licences
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
