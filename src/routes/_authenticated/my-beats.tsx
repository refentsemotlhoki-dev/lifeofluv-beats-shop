import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Download, FileText, LogOut, Save } from "lucide-react";
import { getCustomerLibrary, updateDisplayName } from "@/lib/account.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/button";

export const Route = createFileRoute("/_authenticated/my-beats")({
  loader: () => getCustomerLibrary(),
  head: () => ({
    meta: [
      { title: "My Beats — LifeOfLuv" },
      { name: "description", content: "Access your purchased LifeOfLuv beats and licence files." },
      { property: "og:title", content: "My Beats — LifeOfLuv" },
      { property: "og:description", content: "Your private LifeOfLuv purchase library." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyBeats,
});

function MyBeats() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const saveName = useServerFn(updateDisplayName);
  const [displayName, setDisplayName] = useState(data.profile.display_name);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      await saveName({ data: { displayName } });
      setMessage("Name saved.");
      await router.invalidate();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save your name.");
    } finally {
      setSaving(false);
    }
  }

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
          <p className="mt-3 text-sm text-muted-foreground">Signed in as {data.profile.email}</p>
        </div>
        <Button variant="ghost" onClick={signOut}><LogOut size={16} /> Sign out</Button>
      </div>

      <div className="hairline my-10" />

      <div className="max-w-xl">
        <label className="eyebrow" htmlFor="display-name">Display name</label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input id="display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="min-w-0 flex-1 rounded-sm border border-border bg-card px-4 py-3 text-sm outline-none focus:border-ring" />
          <Button onClick={handleSave} disabled={saving || displayName.trim().length < 2}><Save size={16} /> {saving ? "Saving…" : "Save"}</Button>
        </div>
        {message ? <p className="mt-2 text-xs text-muted-foreground">{message}</p> : null}
      </div>

      <div className="mt-14">
        <p className="eyebrow">Purchases</p>
        {data.purchases.length === 0 ? (
          <div className="mt-5 border-y border-border py-12">
            <h2 className="text-2xl">No purchases found yet</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">Purchases made with {data.profile.email} will appear here after payment is confirmed.</p>
            <Link to="/beats" className="btn-base btn-platinum mt-6">Browse beats</Link>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {data.purchases.map((purchase) => (
              <article key={purchase.id} className="velvet-panel rounded-lg p-6">
                <p className="eyebrow">{purchase.licence_type === "exclusive" ? "Exclusive licence" : "Unlimited lease"}</p>
                <h2 className="mt-3 text-2xl">{purchase.beat_title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Purchased {new Date(purchase.purchased_at).toLocaleDateString("en-CA")} · ${purchase.amount_cad} CAD</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {purchase.download_url ? <a className="btn-base btn-platinum" href={purchase.download_url}><Download size={16} /> Download beat</a> : <span className="text-sm text-muted-foreground">Files are being prepared.</span>}
                  {purchase.agreement_url ? <a className="btn-base btn-ghost" href={purchase.agreement_url}><FileText size={16} /> Licence</a> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}