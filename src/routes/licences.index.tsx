import { createFileRoute, Link } from "@tanstack/react-router";
import { LicenceTable } from "@/components/licence-table";

export const Route = createFileRoute("/licences/")({
  head: () => ({
    meta: [
      { title: "Compare Licences — LifeOfLuv" },
      {
        name: "description",
        content:
          "Unlimited Lease $199 CAD or Exclusive $599 CAD. See exactly what each LifeOfLuv licence covers before you buy.",
      },
      { property: "og:title", content: "Compare Licences — LifeOfLuv" },
      {
        property: "og:description",
        content: "Unlimited Lease $199 CAD or Exclusive $599 CAD — one simple decision.",
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
        Need a beat for your next release? Choose the Unlimited Lease. Want LifeOfLuv to stop
        offering that beat for new licences after your purchase? Choose Exclusive.
      </p>

      <div className="mt-12">
        <LicenceTable />
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
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
        <span className="platinum-text">The short version:</span> Unlimited Lease — you can use the
        beat; others may also license it. Exclusive — LifeOfLuv stops new licensing after your
        purchase; earlier licences remain valid.
      </blockquote>
    </section>
  );
}
