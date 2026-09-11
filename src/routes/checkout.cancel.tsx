import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/cancel")({
  head: () => ({
    meta: [
      { title: "Order not completed — LifeOfLuv" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutCancel,
});

function CheckoutCancel() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="eyebrow">Checkout cancelled</p>
      <h1 className="mt-5 text-4xl md:text-5xl">Your order was not completed</h1>
      <p className="mt-6 text-muted-foreground">
        No charge was made. Your signed agreement was not saved — you'll need to sign again if you
        come back to complete this purchase.
      </p>

      <Link to="/beats" className="btn-base btn-platinum mt-10 inline-block">
        Back to beats
      </Link>
    </section>
  );
}
