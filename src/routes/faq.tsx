import { createFileRoute } from "@tanstack/react-router";

const faqs = [
  {
    q: "Do I own the beat when I buy a licence?",
    a: "You receive the usage rights described in the licence agreement for the option you select. Unless that agreement expressly says otherwise, the beat and underlying rights remain with LifeOfLuv.",
  },
  {
    q: "Can more than one artist use the same beat?",
    a: "Yes, with an Unlimited Lease. It is non-exclusive, so LifeOfLuv may license the beat to more than one artist.",
  },
  {
    q: "What happens when an Exclusive is sold?",
    a: "LifeOfLuv removes the beat from the store for new licences after the Exclusive purchase. Previous licensees keep their valid, previously granted licences.",
  },
  {
    q: "Can I get a refund?",
    a: "All sales are final and no refunds are offered after purchase, except where required by applicable law.",
  },
  {
    q: "When will I get my files?",
    a: "Your purchased files and licence are delivered after payment is confirmed. Check the email address used at checkout and keep your confirmation.",
  },
  {
    q: "Which licence should I choose?",
    a: "Choose Unlimited Lease when you want a straightforward non-exclusive licence for your release. Choose Exclusive when having LifeOfLuv stop future licensing of that beat matters to you. Read the applicable agreement before purchase.",
  },
  {
    q: "Can I use the beat before I buy?",
    a: "No. You may listen to the preview, but you need to purchase the applicable licence before recording, distributing, performing, uploading, or otherwise using the beat beyond any use expressly permitted by LifeOfLuv.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — LifeOfLuv Beat Store" },
      {
        name: "description",
        content:
          "Answers about LifeOfLuv beat licences: ownership, exclusivity, delivery, refunds and which licence to choose.",
      },
      { property: "og:title", content: "FAQ — LifeOfLuv Beat Store" },
      {
        property: "og:description",
        content: "Ownership, exclusivity, delivery, refunds and choosing a licence.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow">Support</p>
      <h1 className="mt-5 text-4xl md:text-5xl">Frequently asked questions</h1>
      <div className="mt-12 space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <h2 className="text-xl">{item.q}</h2>
            <p className="mt-3 text-muted-foreground">{item.a}</p>
            <div className="hairline mt-8" />
          </div>
        ))}
      </div>
    </section>
  );
}
