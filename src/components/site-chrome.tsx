import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";


const nav = [
  { to: "/beats", label: "Beat Store" },
  { to: "/licences", label: "Licences" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="LifeOfLuv"
            className="h-9 w-9 rounded-full object-cover ring-1 ring-border"
          />
          <span className="font-display text-lg tracking-wide">LifeOfLuv</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow transition-colors hover:text-foreground"
              activeProps={{ className: "eyebrow text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to={signedIn ? "/my-beats" : "/auth"} className="btn-base btn-platinum hidden sm:inline-flex">
          <UserRound size={15} /> {signedIn ? "My Beats" : "Sign In"}
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/beats" className="eyebrow hover:text-foreground">
            Beat Store
          </Link>
          <Link to="/licences/unlimited-lease" className="eyebrow hover:text-foreground">
            Unlimited Lease Agreement
          </Link>
          <Link to="/licences/exclusive" className="eyebrow hover:text-foreground">
            Exclusive Licence Agreement
          </Link>
          <Link to="/split-sheet" className="eyebrow hover:text-foreground">
            Song Split Sheet
          </Link>
          <Link to="/terms" className="eyebrow hover:text-foreground">
            Terms of Use
          </Link>
          <Link to="/privacy" className="eyebrow hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/contact" className="eyebrow hover:text-foreground">
            Contact
          </Link>
        </div>
        <div className="hairline my-8" />
        <p className="text-sm text-muted-foreground">
          © LifeOfLuv. Simple licensing. Serious production.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          All prices are shown in Canadian dollars (CAD). Any taxes or payment-provider charges, if
          applicable, will be shown before you complete your order.
        </p>
      </div>
    </footer>
  );
}
