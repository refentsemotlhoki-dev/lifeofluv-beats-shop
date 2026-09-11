# Launch checklist — LifeOfLuv Beat Store

Everything below is outstanding, aside from the legal review of the agreements.

## 1. Blockers — the store cannot take money yet

- **No payment provider connected.** The "Sign & place order" button records a signature and an order number, then tells the buyer no charge was made. Built-in payments need a paid Lovable plan; once upgraded, checkout gets a real payment step, and prices ($199 / $599 CAD) become live products.
- **No order storage.** Signed agreements exist only in the buyer's browser; downloading the copy is the only record. You get no copy of who bought what. This needs the built-in backend so every signed order is saved and emailed.
- **No file delivery.** Nothing sends the buyer their beat files after payment. Right now the page promises delivery "after payment is confirmed" with nothing behind it.

## 2. Content still placeholder

- **All six beats are placeholders** with no audio — every preview player is empty. Real titles, artwork, BPM/key, and audio files needed.
- **Contact email is a guess**: contact@lifeofluv.com. Confirm or replace.
- **Business name and mailing address** are marked "to be added before launch" on the terms page.
- **Split sheet, privacy policy, terms** all display a "pending Ontario legal review" notice — those notices should come off once reviewed.

## 3. Trust and correctness at checkout

- Confirm the displayed price, currency, taxes, delivery wording, and refund wording match whatever the payment provider actually does.
- Decide whether tax is added at checkout (depends on provider setup).
- Exclusive beats need a way to actually be marked sold-out once purchased, so they leave the store.

## 4. Findability and sharing

- Social share images are not set on any page, so links posted to Instagram/X/Discord show no picture. Worth adding the pendant artwork as the share image site-wide.
- Everything else on the search side is in place: titles, descriptions, FAQ structured data, robots file, favicon.

## Suggested order of work

1. Upgrade plan → connect payments → connect the backend for orders and delivery.
2. Upload real beats with audio and artwork.
3. Fill in contact email, business name, address.
4. Add share images.
5. Legal review, then remove the draft notices.

## Technical notes

- Payments: `enable_stripe_payments` (or Paddle) requires a Pro workspace; product creation and a checkout session replace the current `setSigned` local-state stub in `src/routes/checkout.$slug.tsx`.
- Orders/entitlements/delivery need Lovable Cloud (tables for orders + signed agreement text, storage bucket for beat files, signed download URLs, webhook to mark exclusives sold).
- Beats live in `src/data/beats.ts` with `preview: null` on every entry; once audio exists this may move to the database so exclusives can flip to sold at runtime.
- Share images: add `og:image` / `twitter:image` in leaf route `head()` using an absolute published URL.
