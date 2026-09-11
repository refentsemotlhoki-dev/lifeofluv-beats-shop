import { createFileRoute, Link } from "@tanstack/react-router";
import { PRIVACY_POLICY } from "@/data/legal";
import { ClauseList } from "@/components/agreement-document";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — LifeOfLuv" },
      {
        name: "description",
        content:
          "How LifeOfLuv collects, uses, discloses and protects personal information across the beat store, purchases, licence delivery and support.",
      },
      { property: "og:title", content: "Privacy Policy — LifeOfLuv" },
      {
        property: "og:description",
        content: "What the beat store collects, how it is used, and your access and correction rights.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const p = PRIVACY_POLICY;
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow">LifeOfLuv · Legal</p>
      <h1 className="mt-5 text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Effective date: {p.effective}</p>

      <div className="velvet-panel mt-8 rounded-lg p-6 text-sm text-muted-foreground">
        Business draft pending Ontario legal review. This is not legal advice, and it should be
        checked against the final payment provider, hosting, analytics and email tools before launch.
      </div>

      <div className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {p.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <ClauseList clauses={p.clauses} />

      <div className="hairline my-10" />
      <p className="text-sm text-muted-foreground">
        Privacy questions, access requests and corrections can be sent through the{" "}
        <Link to="/contact" className="underline hover:text-foreground">
          contact page
        </Link>
        .
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/terms" className="btn-base btn-ghost">
          Website Terms
        </Link>
        <Link to="/licences" className="btn-base btn-ghost">
          Licences
        </Link>
      </div>
    </section>
  );
}
