import { createFileRoute, Link } from "@tanstack/react-router";
import { LicenceTable } from "@/components/licence-table";

export const Route = createFileRoute("/licences/")({
  head: () => ({
    meta: [
      { title: "Compare Licences — LifeOfLuv" },
      {
        name: "description",
        content:
          "Basic Lease $20, Unlimited Lease $99, or Exclusive $399 CAD. See exactly what each LifeOfLuv licence covers before you buy.",
      },
      { property: "og:title", content: "Compare Licences — LifeOfLuv" },
      {
        property: "og:description",
        content: "Three tiers: Basic Lease $20, Unlimited Lease $99, Exclusive $399 CAD — one simple decision.",
      },
    ],
  }),
  component: Licences,
});

function Licences() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="eyebrow">Licences</p>
      <h1 className="mt-5 max-w-3xl text-4xl md:text-5xl">
        Give your customers one simple decision
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Starting at $20, LifeOfLuv keeps licensing simple. Choose the tier that fits where you are right now.
      </p>

      <div className="mt-12">
        <LicenceTable />
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl">What is a Basic Lease?</h2>
          <p className="mt-4 text-muted-foreground">
            The Basic Lease is designed for emerging artists ready to release their first record. You get a high-quality untagged MP3 with up to 50,000 audio streams and 10,000 monetized video views on a single commercial song. It's non-exclusive and eligible for upgrade at any time — you only pay the difference.
          </p>
          <Link to="/licences/basic-lease" className="btn-base btn-ghost mt-6">
            Read the agreement
          </Link>
        </div>
        <div>
          <h2 className="text-2xl">What is an Unlimited Lease?</h2>
          <p className="mt-4 text-muted-foreground">
            An Unlimited Lease is a non-exclusive licence. It gives you the permissions described in
            your licence agreement to use the beat for your music, but it does not remove the beat
            from the store. LifeOfLuv may license the same beat to other artists.
          </p>
          <Link to="/licences/unlimited-lease" className="btn-base btn-ghost mt-6">
            Read the agreement
          </Link>
        </div>
        <div>
          <h2 className="text-2xl">What does Exclusive mean here?</h2>
          <p className="mt-4 text-muted-foreground">
            An Exclusive purchase means LifeOfLuv will stop offering that beat for new licences after
            your order. It is not retroactive: anyone who purchased a valid licence before the
            Exclusive sale keeps the rights granted in their own agreement.
          </p>
          <Link to="/licences/exclusive" className="btn-base btn-ghost mt-6">
            Read the agreement
          </Link>
        </div>
      </div>

      <blockquote className="velvet-panel mt-16 rounded-lg p-8 text-lg leading-relaxed">
        <span className="platinum-text">The short version:</span> Basic Lease — your entry point, usage-limited, eligible for upgrade. Unlimited Lease — no ceilings, still non-exclusive. Exclusive — LifeOfLuv stops new licensing after your purchase; earlier licences remain valid.
      </blockquote>
    </section>
  );
}
