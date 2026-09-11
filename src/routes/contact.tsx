import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LifeOfLuv" },
      {
        name: "description",
        content:
          "Reach LifeOfLuv about beats, licences, custom production or an order you already placed.",
      },
      { property: "og:title", content: "Contact — LifeOfLuv" },
      { property: "og:description", content: "Questions about beats, licences or your order." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-5 text-4xl md:text-5xl">Get in touch</h1>
      <p className="mt-5 text-muted-foreground">
        Questions about a licence, a custom beat, or an order you already placed? Send a note and
        include the email address used at checkout.
      </p>
      <div className="velvet-panel mt-10 rounded-lg p-6">
        <p className="eyebrow">Email</p>
        <a href="mailto:contact@lifeofluv.com" className="mt-2 block text-xl underline">
          contact@lifeofluv.com
        </a>
        <p className="mt-6 eyebrow">Response time</p>
        <p className="mt-2 text-muted-foreground">Replies within 1–2 business days.</p>
      </div>
    </section>
  );
}
