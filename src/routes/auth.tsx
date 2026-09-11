import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function safeNext(value: string | undefined) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/my-beats";
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { next?: string } =>
    typeof search["next"] === "string" ? { next: search["next"] } : {},
  head: () => ({
    meta: [
      { title: "Sign in — LifeOfLuv" },
      { name: "description", content: "Sign in to access your purchased LifeOfLuv beats from any device." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const destination = safeNext(next);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: destination });
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) void navigate({ to: destination });
    });
    return () => subscription.subscription.unsubscribe();
  }, [destination, navigate]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(destination)}`,
        shouldCreateUser: true,
      },
    });
    setBusy(false);
    if (error) return setMessage(error.message);
    setSent(true);
  }

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl items-center px-5 py-16 lg:grid-cols-[1fr_30rem] lg:gap-20">
      <div className="hidden lg:block">
        <p className="eyebrow">LifeOfLuv account</p>
        <h1 className="mt-5 max-w-xl text-6xl">Your music, wherever you create.</h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Access purchased beats and licence files from any device using the same email used at
          checkout.
        </p>
      </div>
      <div className="velvet-panel rounded-lg p-6 sm:p-8">
        <p className="eyebrow">Sign in</p>
        <h1 className="mt-3 text-3xl lg:hidden">Your music, wherever you create.</h1>
        <h2 className="mt-3 hidden text-3xl lg:block">Access your beats</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          No password — we'll email you a link to sign in.
        </p>
        {sent ? (
          <p className="mt-7 text-sm" role="status">
            Check <strong>{email.trim()}</strong> for a sign-in link. You can close this tab.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block">
              <span className="eyebrow">Email</span>
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ring"
              />
            </label>
            <button type="submit" className="btn-base btn-platinum w-full" disabled={busy}>
              <Mail size={16} /> {busy ? "Sending…" : "Send sign-in link"}
            </button>
          </form>
        )}
        {message ? (
          <p className="mt-4 text-sm text-muted-foreground" role="status">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
