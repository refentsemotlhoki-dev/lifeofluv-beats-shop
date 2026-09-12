import { createFileRoute } from "@tanstack/react-router";
import { getBeats } from "@/lib/beats";
import { BeatCard } from "@/components/beat-card";

export const Route = createFileRoute("/beats/")({
  loader: () => getBeats(),
  head: () => ({
    meta: [
      { title: "Beat Store — LifeOfLuv" },
      {
        name: "description",
        content:
          "Browse beats by LifeOfLuv. Find the sound, then choose the licence that fits your release plan.",
      },
      { property: "og:title", content: "Beat Store — LifeOfLuv" },
      {
        property: "og:description",
        content: "Find the sound, then choose the licence that fits your release plan.",
      },
    ],
  }),
  component: BeatStore,
});

function BeatStore() {
  const beats = Route.useLoaderData();
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="eyebrow">Beat Store</p>
      <h1 className="mt-5 text-4xl md:text-5xl">Find the sound</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Find the sound, then choose the licence that fits your release plan.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {beats.map((beat) => (
          <BeatCard key={beat.slug} beat={beat} />
        ))}
      </div>
    </section>
  );
}
