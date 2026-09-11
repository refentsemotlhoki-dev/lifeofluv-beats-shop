import { createFileRoute, Link } from "@tanstack/react-router";
import { beats } from "@/data/beats";
import { BeatCard } from "@/components/beat-card";
import { LicenceTable } from "@/components/licence-table";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeOfLuv — Simple Licensing. Serious Production." },
      {
        name: "description",
        content:
          "Straightforward beats for artists ready to make the record. Unlimited Lease $199 CAD, Exclusive $599 CAD. Secure checkout, instant delivery.",
      },
      { property: "og:title", content: "LifeOfLuv — Simple Licensing. Serious Production." },
      {
        property: "og:description",
        content: "Beats by LifeOfLuv. Unlimited Lease $199 CAD or Exclusive $599 CAD.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src="/images/hero-velvet.jpg"
          alt="Iced-out LifeOfLuv pendant resting on black velvet"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="relative mx-auto max-w-6xl px-5 py-28 md:py-40">
          <p className="eyebrow">LifeOfLuv · Producer</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] md:text-7xl">
            <span className="platinum-text">Simple licensing.</span>
            <br />
            Serious production.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Straightforward beats for artists who are ready to make the record.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/beats" className="btn-base btn-platinum">
              Browse Beats
            </Link>
            <Link to="/licences" className="btn-base btn-ghost">
              Compare Licences
            </Link>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Clear pricing in CAD. Secure checkout. Instant delivery after purchase.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">The store</p>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            LifeOfLuv makes it easy to get the production you need and understand the licence you
            are buying. Choose an{" "}
            <span className="text-foreground">Unlimited Lease</span> to release your music with
            confidence, or secure an <span className="text-foreground">Exclusive</span> when you want
            the beat taken off the market for future licensing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl">Latest beats</h2>
          <Link to="/beats" className="eyebrow hover:text-foreground">
            View all beats
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beats.slice(0, 3).map((beat) => (
            <BeatCard key={beat.slug} beat={beat} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <h2 className="max-w-2xl text-3xl md:text-4xl">Give your customers one simple decision</h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Need a beat for your next release? Choose the Unlimited Lease. Want LifeOfLuv to stop
          offering that beat for new licences after your purchase? Choose Exclusive.
        </p>
        <div className="mt-10">
          <LicenceTable />
        </div>
      </section>
    </>
  );
}
