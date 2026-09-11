import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } =>
    typeof search["session_id"] === "string" ? { session_id: search["session_id"] } : {},
  head: () => ({
    meta: [
      { title: "Order complete — LifeOfLuv" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutSuccess,
});

function CheckoutSuccess() {
  const { session_id } = Route.useSearch();

  return (
    <section className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="eyebrow">Order complete</p>
      <h1 className="mt-5 text-4xl md:text-5xl">Payment received</h1>
      <p className="mt-6 text-muted-foreground">
        Check your email for your files, licence agreement, and receipt — delivery usually arrives
        within a few minutes of payment.
      </p>

      <div className="velvet-panel mt-10 rounded-lg p-6 text-left">
        <p className="eyebrow">What happens next</p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• We confirm your payment and prepare your files automatically.</li>
          <li>• A zip with your beat, signed licence, and receipt is emailed to you.</li>
          <li>• Keep that email — it's your record of the licence you purchased.</li>
        </ul>
        {session_id ? (
          <p className="mt-6 text-xs text-muted-foreground">
            Payment reference: <span className="font-mono">{session_id}</span>
          </p>
        ) : null}
      </div>

      <Link to="/beats" className="btn-base btn-platinum mt-10 inline-block">
        Browse more beats
      </Link>
      <Link to="/my-beats" className="btn-base btn-ghost mt-3 inline-block sm:ml-3">
        Open My Beats
      </Link>
    </section>
  );
}
