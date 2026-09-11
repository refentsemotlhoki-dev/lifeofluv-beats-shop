import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Download, LogOut } from "lucide-react";
import { getMyBeats } from "@/lib/my-beats.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/my-beats")({
  loader: () => getMyBeats(),
  head: () => ({
    meta: [
      { title: "My Beats — LifeOfLuv" },
      { name: "description", content: "Access your purchased LifeOfLuv beats and licence files." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyBeats,
});

function MyBeats() {
  const data = Route.useLoaderData();
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    await router.navigate({ to: "/" });
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Private library</p>
          <h1 className="mt-4 text-4xl md:text-5xl">My Beats</h1>
        </div>
        <button type="button" className="btn-base btn-ghost" onClick={signOut}>
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="hairline my-10" />

      {data.purchases.length === 0 ? (
        <div className="border-y border-border py-12">
          <h2 className="text-2xl">No purchases found yet</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Purchases made with this email will appear here after payment is confirmed.
          </p>
          <Link to="/beats" className="btn-base btn-platinum mt-6 inline-block">
            Browse beats
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.purchases.map((purchase) => (
            <article key={purchase.id} className="velvet-panel rounded-lg p-6">
              <p className="eyebrow">
                {purchase.licenceType === "exclusive" ? "Exclusive licence" : "Unlimited lease"}
              </p>
              <h2 className="mt-3 text-2xl">{purchase.beatTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Purchased {new Date(purchase.signedAt).toLocaleDateString("en-CA")} · $
                {purchase.priceCad} CAD
              </p>
              <div className="mt-6">
                {purchase.downloadUrl ? (
                  <a className="btn-base btn-platinum" href={purchase.downloadUrl}>
                    <Download size={16} /> Download files
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Files unavailable for redownload — check your original confirmation email.
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
