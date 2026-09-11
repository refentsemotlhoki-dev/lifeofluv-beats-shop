import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { getBeat, PRICES } from "@/data/beats";
import { AGREEMENTS } from "@/data/legal";
import {
  AgreementDetails,
  ClauseList,
  SignatureBlock,
  type AgreementFill,
} from "@/components/agreement-document";

type Licence = "lease" | "exclusive";

export const Route = createFileRoute("/checkout/$slug")({
  validateSearch: (search: Record<string, unknown>): { licence: Licence } => ({
    licence: search["licence"] === "exclusive" ? "exclusive" : "lease",
  }),
  loader: ({ params }) => {
    const beat = getBeat(params.slug);
    if (!beat) throw notFound();
    return { beat };
  },
  head: () => ({
    meta: [
      { title: "Checkout — LifeOfLuv" },
      {
        name: "description",
        content:
          "Review and sign your LifeOfLuv licence agreement, then complete your order in Canadian dollars.",
      },
      { property: "og:title", content: "Checkout — LifeOfLuv" },
      { property: "og:description", content: "Review, sign and complete your licence order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const normalize = (v: string) => v.trim().replace(/\s+/g, " ").toLowerCase();

// Set VITE_CHECKOUT_FUNCTION_URL in your environment (Vercel + local .env) to:
// https://jmespcsjkrucykzugsxn.supabase.co/functions/v1/create-checkout
const CHECKOUT_FUNCTION_URL =
  import.meta.env["VITE_CHECKOUT_FUNCTION_URL"] ??
  "https://jmespcsjkrucykzugsxn.supabase.co/functions/v1/create-checkout";

function Checkout() {
  const { beat } = Route.useLoaderData();
  const { licence } = Route.useSearch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [readToEnd, setReadToEnd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isExclusive = licence === "exclusive";
  const agreement = isExclusive ? AGREEMENTS.exclusive : AGREEMENTS.lease;
  const price = isExclusive ? PRICES.exclusive : PRICES.lease;

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }),
    []
  );

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const nameOk = name.trim().length > 1;
  const signatureOk = signature.trim().length > 1 && normalize(signature) === normalize(name);

  const fill: AgreementFill = {
    beatTitle: beat.title,
    productId: `${beat.slug}-${agreement.id}`,
    licenseeName: name,
    licenseeEmail: email,
    purchaseDate: today,
    orderId: "Assigned at payment",
    signature: signature,
  };

  const canSign = nameOk && emailOk && readToEnd && agreed && signatureOk;

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) setReadToEnd(true);
  };

  async function placeOrder() {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(CHECKOUT_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          beatSlug: beat.slug,
          beatTitle: beat.title,
          licenceType: licence,
          licenseeName: name.trim(),
          licenseeEmail: email.trim(),
          signature: signature.trim(),
          signedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? "Could not start checkout. Please try again.");
      }

      // Redirect to Stripe's hosted checkout page.
      window.location.href = data.url;
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong starting checkout."
      );
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-16">
      <Link to="/beats/$slug" params={{ slug: beat.slug }} className="eyebrow hover:text-foreground">
        ← Back to {beat.title}
      </Link>

      <h1 className="mt-6 text-4xl">Checkout</h1>

      <div className="velvet-panel mt-8 flex flex-wrap items-center gap-5 rounded-lg p-5">
        <img
          src={beat.artwork}
          alt={`${beat.title} artwork`}
          className="h-20 w-20 rounded-sm object-cover"
        />
        <div className="min-w-40 flex-1">
          <p className="eyebrow">{agreement.licenceType}</p>
          <h2 className="mt-1 text-2xl">{beat.title}</h2>
        </div>
        <p className="text-xl">${price} CAD</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/checkout/$slug"
          params={{ slug: beat.slug }}
          search={{ licence: "lease" }}
          className={isExclusive ? "btn-base btn-ghost" : "btn-base btn-platinum"}
        >
          Unlimited Lease ${PRICES.lease}
        </Link>
        {beat.exclusiveSold ? null : (
          <Link
            to="/checkout/$slug"
            params={{ slug: beat.slug }}
            search={{ licence: "exclusive" }}
            className={isExclusive ? "btn-base btn-platinum" : "btn-base btn-ghost"}
          >
            Exclusive ${PRICES.exclusive}
          </Link>
        )}
      </div>

      {/* Step 1 — licensee details */}
      <div className="mt-12">
        <p className="eyebrow">Step 1 — Licensee details</p>
        <h2 className="mt-3 text-2xl">Who is this licence for?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          These details fill into your agreement automatically and appear on your licence record.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow">Legal name (person or company)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Mensah"
              className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-ring"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Email for delivery</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              placeholder="you@email.com"
              className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-ring"
            />
          </label>
        </div>
      </div>

      {/* Step 2 — the agreement */}
      <div className="mt-14">
        <p className="eyebrow">Step 2 — Your agreement</p>
        <h2 className="mt-3 text-2xl">{agreement.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          ${agreement.price} CAD · {agreement.licenceType} · Effective date: {agreement.effective}
        </p>

        <div className="mt-6">
          <AgreementDetails fill={fill} />
        </div>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="velvet-panel mt-6 max-h-[26rem] overflow-y-auto rounded-lg px-6 py-6"
        >
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            {agreement.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ClauseList clauses={agreement.clauses} />
          <div className="mt-10">
            <h2 className="font-display text-xl text-foreground">Acceptance</h2>
            <p className="mt-3 text-sm text-muted-foreground">{agreement.acceptanceIntro}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {agreement.acceptanceItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="platinum-text mt-[0.15rem] text-xs">◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {readToEnd
            ? "You have scrolled to the end of the agreement."
            : "Scroll to the end of the agreement to continue."}
        </p>

        {isExclusive ? (
          <p className="velvet-panel mt-6 rounded-lg p-5 text-sm text-muted-foreground">
            This purchase stops new LifeOfLuv licences for this beat after your order. It does not
            cancel licences granted to customers before your purchase.
          </p>
        ) : null}
      </div>

      {/* Step 3 — sign */}
      <div className="mt-14">
        <p className="eyebrow">Step 3 — Sign electronically</p>
        <h2 className="mt-3 text-2xl">Type your name to sign</h2>
        <label className="mt-6 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 accent-primary"
          />
          <span className="text-sm text-muted-foreground">
            I have read and agree to the{" "}
            <Link
              to={isExclusive ? "/licences/exclusive" : "/licences/unlimited-lease"}
              className="underline hover:text-foreground"
            >
              {agreement.title}
            </Link>{" "}
            and the{" "}
            <Link to="/terms" className="underline hover:text-foreground">
              Website Terms and Conditions
            </Link>
            . I understand my purchase is a licence to use the beat, not a transfer of ownership
            unless the agreement expressly says otherwise.
          </span>
        </label>

        <label className="mt-6 block max-w-md">
          <span className="eyebrow">Signature — type your legal name exactly</span>
          <input
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder={name.trim() || "Your legal name"}
            className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 font-display text-xl italic text-foreground outline-none focus:border-ring"
          />
        </label>
        {signature.trim() && !signatureOk ? (
          <p className="mt-2 text-xs text-destructive">
            Your signature must match the legal name entered above.
          </p>
        ) : null}

        <SignatureBlock fill={fill} />
      </div>

      {/* Step 4 — pay */}
      <div className="mt-14 space-y-5 text-sm text-muted-foreground">
        <p>
          Your files and licence will be emailed to {email.trim() || "your email address"} after
          payment is confirmed. Keep a copy of your order confirmation and signed agreement.
        </p>
        <p>
          All sales are final. No refunds are offered after purchase, except where required by
          applicable law. This notice does not limit any rights that cannot legally be waived.
        </p>
        <p>
          All prices are shown in Canadian dollars (CAD). Any taxes or payment-provider charges, if
          applicable, will be shown before you complete your order.
        </p>
      </div>

      <button
        type="button"
        disabled={!canSign || submitting}
        onClick={placeOrder}
        className="btn-base btn-platinum mt-8 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? "Redirecting to payment…" : `Sign & place order — $${price} CAD`}
      </button>

      {submitError ? (
        <p className="mt-4 text-sm text-destructive">{submitError}</p>
      ) : null}
    </section>
  );
}
