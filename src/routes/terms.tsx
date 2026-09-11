import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_TERMS } from "@/data/legal";
import { ClauseList } from "@/components/agreement-document";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Website Terms and Conditions — LifeOfLuv" },
      {
        name: "description",
        content:
          "The terms governing the LifeOfLuv beat store: licences, orders, pricing in CAD, digital delivery, refunds and acceptable use.",
      },
      { property: "og:title", content: "Website Terms and Conditions — LifeOfLuv" },
      {
        property: "og:description",
        content: "Store terms, licences, digital delivery and refund policy.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-5 text-4xl md:text-5xl">Website Terms and Conditions</h1>

      <div className="velvet-panel mt-8 rounded-lg p-6 text-sm text-muted-foreground">
        Business draft pending Ontario legal review. This is not legal advice. If these Terms
        conflict with a licence agreement, the licence agreement controls for that product.
      </div>

      <div className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {SITE_TERMS.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <ClauseList clauses={SITE_TERMS.clauses} />

      <div className="mt-12">
        <h2 className="font-display text-2xl">17. Contact</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Questions about these Terms can be sent through the{" "}
          <Link to="/contact" className="underline hover:text-foreground">
            contact page
          </Link>
          . The registered business name and mailing address will be added before launch.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/licences/unlimited-lease" className="btn-base btn-ghost">
          Unlimited Licence
        </Link>
        <Link to="/licences/exclusive" className="btn-base btn-ghost">
          Exclusive Licence
        </Link>
        <Link to="/privacy" className="btn-base btn-ghost">
          Privacy Policy
        </Link>
      </div>
    </section>
  );
}
