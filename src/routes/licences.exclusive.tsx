import { createFileRoute, Link } from "@tanstack/react-router";
import { EXCLUSIVE_AGREEMENT } from "@/data/legal";
import { ClauseList } from "@/components/agreement-document";

export const Route = createFileRoute("/licences/exclusive")({
  head: () => ({
    meta: [
      { title: "Exclusive Beat Licence Agreement — LifeOfLuv" },
      {
        name: "description",
        content:
          "Read the full LifeOfLuv Exclusive Beat Licence Agreement — $599 CAD, stops new licences after your order, signed electronically at checkout.",
      },
      { property: "og:title", content: "Exclusive Beat Licence Agreement — LifeOfLuv" },
      {
        property: "og:description",
        content: "$599 CAD. LifeOfLuv stops new licences for the beat after your order.",
      },
    ],
  }),
  component: ExclusiveLicence,
});

function ExclusiveLicence() {
  const a = EXCLUSIVE_AGREEMENT;
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow">LifeOfLuv · {a.licenceType}</p>
      <h1 className="mt-5 text-4xl md:text-5xl">{a.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Price: ${a.price} CAD · Effective date: {a.effective}
      </p>

      <div className="velvet-panel mt-8 rounded-lg p-6 text-sm text-muted-foreground">
        This is the agreement you sign at checkout. It is a business draft pending Ontario legal
        review and is not legal advice.
      </div>

      <div className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {a.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <ClauseList clauses={a.clauses} />

      <div className="mt-12">
        <h2 className="font-display text-2xl">Acknowledgement</h2>
        <p className="mt-3 text-sm text-muted-foreground">{a.acceptanceIntro}</p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {a.acceptanceItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="platinum-text mt-[0.15rem] text-xs">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hairline my-10" />
      <p className="text-sm text-muted-foreground">
        You sign this agreement electronically at checkout. Your name, email, beat title and order
        reference fill in automatically, and you can download your signed copy.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        The composition split defaults to 50% LifeOfLuv and 50% the artist side. Use the{" "}
        <Link to="/split-sheet" className="underline hover:text-foreground">
          Song Split Sheet
        </Link>{" "}
        whenever a song has additional writers or a different arrangement.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/beats" className="btn-base btn-platinum">
          Browse Beats
        </Link>
        <Link to="/split-sheet" className="btn-base btn-ghost">
          Song Split Sheet
        </Link>
      </div>
    </section>
  );
}
