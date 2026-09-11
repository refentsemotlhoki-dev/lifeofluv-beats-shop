import { createFileRoute, Link } from "@tanstack/react-router";
import { SPLIT_SHEET } from "@/data/legal";
import { ClauseList } from "@/components/agreement-document";

export const Route = createFileRoute("/split-sheet")({
  head: () => ({
    meta: [
      { title: "Producer / Song Split Sheet — LifeOfLuv" },
      {
        name: "description",
        content:
          "The LifeOfLuv song split sheet: record composition shares, publishing administration and signatures for a song made with a LifeOfLuv beat.",
      },
      { property: "og:title", content: "Producer / Song Split Sheet — LifeOfLuv" },
      {
        property: "og:description",
        content:
          "Default 50/50 composition split for exclusive beats, with room for additional writers and publishers.",
      },
    ],
  }),
  component: SplitSheet,
});

function SplitSheet() {
  const s = SPLIT_SHEET;
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow">{s.subtitle}</p>
      <h1 className="mt-5 text-4xl md:text-5xl">{s.title}</h1>

      <div className="velvet-panel mt-8 rounded-lg p-6 text-sm text-muted-foreground">
        Business draft pending Ontario legal review. This is not legal advice.
      </div>

      <div className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {s.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="velvet-panel mt-10 rounded-lg p-6">
        <p className="eyebrow">Song information</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {s.fields.map((field) => (
            <div key={field} className="border-b border-border pb-3">
              <p className="eyebrow">{field}</p>
              <p className="mt-2 text-sm text-muted-foreground">—</p>
            </div>
          ))}
        </div>
      </div>

      <ClauseList clauses={s.clauses} />

      <div className="velvet-panel mt-10 grid gap-6 rounded-lg p-6 sm:grid-cols-2">
        {s.signatories.map((party, i) => (
          <div key={`${party}-${i}`}>
            <p className="eyebrow">{party}</p>
            <div className="hairline mt-8" />
            <p className="mt-2 text-xs text-muted-foreground">Signature · Date</p>
          </div>
        ))}
      </div>

      <div className="hairline my-10" />
      <p className="text-sm text-muted-foreground">
        The Exclusive Beat Licence sets a default 50% composition interest to LifeOfLuv and 50% to
        the artist side. A signed split sheet controls whenever a song has additional writers,
        co-producers or publishers, or whenever that default is changed.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/licences/exclusive" className="btn-base btn-platinum">
          Exclusive Licence Agreement
        </Link>
        <Link to="/contact" className="btn-base btn-ghost">
          Request a split sheet
        </Link>
      </div>
    </section>
  );
}
