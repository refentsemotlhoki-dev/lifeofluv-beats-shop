import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Chrome, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

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
      { property: "og:title", content: "LifeOfLuv Customer Account" },
      { property: "og:description", content: "Access your purchased beats and licence files." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const destination = safeNext(next);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: destination });
    });
  }, [destination, navigate]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { display_name: displayName.trim() },
          emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(destination)}`,
        },
      });
      setBusy(false);
      if (error) return setMessage(error.message);
      if (data.session) return void navigate({ to: destination });
      setMessage("Check your email to confirm your account, then sign in.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return setMessage(error.message);
    await navigate({ to: destination });
  }

  async function signInWithGoogle() {
    sessionStorage.setItem("lifeofluv_auth_next", destination);
    setBusy(true);
    setMessage("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/auth` });
    if (result.error) {
      setBusy(false);
      setMessage(result.error.message);
    } else if (!result.redirected) {
      await navigate({ to: destination });
    }
  }

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl items-center px-5 py-16 lg:grid-cols-[1fr_30rem] lg:gap-20">
      <div className="hidden lg:block">
        <p className="eyebrow">LifeOfLuv account</p>
        <h1 className="mt-5 max-w-xl text-6xl">Your music, wherever you create.</h1>
        <p className="mt-6 max-w-lg text-muted-foreground">Access purchased beats and licence files from any device using the same email used at checkout.</p>
      </div>
      <div className="velvet-panel rounded-lg p-6 sm:p-8">
        <p className="eyebrow">{mode === "signin" ? "Welcome back" : "Create account"}</p>
        <h1 className="mt-3 text-3xl lg:hidden">Your music, wherever you create.</h1>
        <h2 className="mt-3 hidden text-3xl lg:block">{mode === "signin" ? "Sign in" : "Join LifeOfLuv"}</h2>
        <Button type="button" variant="ghost" className="mt-7 w-full" onClick={signInWithGoogle} disabled={busy}><Chrome size={16} /> Continue with Google</Button>
        <div className="my-6 flex items-center gap-4"><span className="h-px flex-1 bg-border" /><span className="eyebrow">or</span><span className="h-px flex-1 bg-border" /></div>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" ? <label className="block"><span className="eyebrow">Display name</span><input required minLength={2} value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ring" /></label> : null}
          <label className="block"><span className="eyebrow">Email</span><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ring" /></label>
          <label className="block"><span className="eyebrow">Password</span><input required minLength={8} type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ring" /></label>
          <Button className="w-full" disabled={busy}>{mode === "signin" ? <><LogIn size={16} /> Sign in</> : <><UserPlus size={16} /> Create account</>}</Button>
        </form>
        {message ? <p className="mt-4 text-sm text-muted-foreground" role="status">{message}</p> : null}
        <button type="button" className="mt-6 text-sm text-muted-foreground underline hover:text-foreground" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>
          {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}