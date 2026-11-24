# LifeOfLuv Beat Store — Agent Log & Architecture Guide

This document maintains operational context, completed milestones, architectural design decisions, and active/upcoming tasks for autonomous AI agents collaborating on the LifeOfLuv beat store repository.

---

## 1. Quick Reference & Core Infrastructure

| Component | Identifier / Location | Notes |
|---|---|---|
| **Working Repository Directory** | `/Users/fentse/Desktop/LifeOfLuv Documentation/LOL website /lifeofluv-beats-shop-main` | **Always use this directory** (avoid legacy clone folders). |
| **Git Remote** | `https://github.com/refentsemotlhoki-dev/lifeofluv-beats-shop.git` | Branch: `main`. Auto-deploys to Vercel. |
| **Hosting Platform** | Vercel (`lifeofluv-beats-shop.vercel.app`) | Nitro / SSR Cloudflare preset. |
| **Supabase Project** | `jmespcsjkrucykzugsxn` (`LifeOfLuv`, region: `us-west-2`) | Host: `db.jmespcsjkrucykzugsxn.supabase.co`. |
| **Stripe Account** | `acct_1PxxLJ02PMKPz5Cc` | Live Mode (`rk_live_...`). All products in CAD. |
| **Support / Production Email**| `prod.lifeofluv@gmail.com` | Primary contact and sender identity. |

---

## 2. Live Pricing & Stripe Products

The store operates on a **3-tier licensing model** (CAD):

| Licence Tier | Price (CAD) | Stripe Product ID | Stripe Price ID | Delivery Files | Stream Limit | Upgrades |
|---|---|---|---|---|---|---|
| **Basic Lease** | **$20.00** | `prod_VgYTRT9XaG7jdW` | `price_1UfBMm02PMKPz5Ccd1a1p9PL` | Untagged MP3 | 50,000 streams / 10k video views | Pay difference ($79) |
| **Unlimited Lease** | **$99.00** | `prod_VEQCUaC15crgbA` | `price_1UfBN102PMKPz5CcLbG1xRx4` | MP3 + WAV | Unlimited streams & views | — |
| **Exclusive Rights** | **$399.00** | `prod_VEQCO5nK3HD0p7` | `price_1UfBNG02PMKPz5CcSgs96afQ` | MP3 + WAV + Trackouts | Unlimited (beat removed from store) | Prior leases honored |

---

## 3. Architecture & Key Files

### Frontend & Routing (TanStack Start / TanStack Router)
- `src/routes/index.tsx`: Homepage with hero section, latest beats, and 3-tier comparison summary.
- `src/routes/beats.$slug.tsx`: Individual beat details with 3 licensing panels (Basic, Unlimited, Exclusive).
- `src/routes/checkout.$slug.tsx`: Checkout route. Handles legal details, electronic signature validation, and dispatches to `create-checkout`.
- `src/routes/licences.index.tsx`: Comparison overview of all 3 licences.
- `src/routes/licences.basic-lease.tsx`: Full text of the Basic Beat Licence Agreement.
- `src/routes/licences.unlimited-lease.tsx`: Full text of the Unlimited Lease Agreement.
- `src/routes/licences.exclusive.tsx`: Full text of the Exclusive Licence Agreement.
- `src/components/licence-table.tsx`: 4-column matrix comparing 13 licensing rights across tiers.
- `src/data/legal.ts`: Source of truth for legal contracts (`BASIC_AGREEMENT`, `UNLIMITED_AGREEMENT`, `EXCLUSIVE_AGREEMENT`, `SITE_TERMS`, `SPLIT_SHEET`).

### Backend (Supabase Edge Functions & Database)
- `supabase/functions/create-checkout/index.ts`:
  - Validates `licenceType` (`basic`, `lease`, `exclusive`).
  - Inserts `pending` order into Postgres `orders` table.
  - Creates live Stripe Checkout Session with metadata and returns hosted payment URL.
- `supabase/functions/stripe-webhook/index.ts`:
  - Verifies Stripe webhook signature (`STRIPE_WEBHOOK_SECRET`).
  - On `checkout.session.completed`: marks order as `paid`, saves `stripe_session_id` and `payment_intent`.
  - If `exclusive`: automatically marks beat as `exclusive_sold: true` in `beats` table.
- `supabase/migrations/`:
  - `20260911_beats_table.sql`: Beat catalog schema and initial records.
  - `20260911_customer_accounts.sql`: Magic link accounts & order association.
  - `20261123_orders_basic_tier.sql`: Updated `orders_licence_type_check` constraint for `basic`.

### Security Hardening
- `vercel.json`: Strict HTTP response headers including Content Security Policy (restricted to Stripe & Supabase), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`.

---

## 4. Completed Milestones Log

- **Asset Migration (Lovable Decoupling):**
  - Downloaded and relocated all artwork and hero assets into `public/images/`.
  - Replaced Lovable internal CDN pointers (`/__l5e/assets-v1/...`) with static local paths.
  - Generated transparent 512x512 circular favicon (`public/favicon.png`) without white borders.
- **3-Tier Pricing Structure ($20 / $99 / $399 CAD):**
  - Updated `src/data/beats.ts` with new prices and `Licence` type union.
  - Expanded `licence-table.tsx` with comprehensive 13-row feature matrix.
  - Updated beat details page, checkout selector, and homepage copy.
- **Legal Modernization (`src/data/legal.ts`):**
  - Authored full `BASIC_AGREEMENT` with 50,000 stream cap, 10,000 video views, and upgrade obligation.
  - Standardized default 50/50 publishing/composition royalty split across all 3 tiers.
  - Added Content ID enrollment restrictions to prevent false automated copyright claims.
  - Added Basic Lease upgrade exception to Exclusive Agreement (protects existing releases).
  - Replaced hardcoded currency strings with dynamic order-confirmation phrasing.
- **Stripe & Supabase Checkout Integration:**
  - Created live CAD products and prices in Stripe for Basic ($20), Unlimited ($99), and Exclusive ($399).
  - Implemented and deployed Supabase Edge Functions (`create-checkout`, `stripe-webhook`).
  - Updated Supabase database check constraint on `orders.licence_type`.
  - Verified live checkout generation across all 3 tiers (`LOL-U8BCYY`, `LOL-U86ERP`, `LOL-U8BJX4`).

---

## 5. Active & Upcoming Tasks

1. **Stripe Webhook Live Endpoint Configuration:**
   - Ensure the Stripe Dashboard webhook endpoint is configured to point to `https://jmespcsjkrucykzugsxn.supabase.co/functions/v1/stripe-webhook`.
   - Event to subscribe: `checkout.session.completed`.
   - Ensure `STRIPE_WEBHOOK_SECRET` is set in Supabase Edge Function secrets.
2. **Automated File Fulfillment & Email Delivery:**
   - Integrate automated zip packaging (.wav/.mp3 + signed licence text + receipt) upon payment confirmation using Resend or signed download URLs from the private Supabase `order-files` storage bucket.
3. **Dedicated Upgrades Flow:**
   - Build a pay-the-difference upgrade link for previous Basic Lease buyers (e.g., `/checkout/upgrade?orderRef=LOL-XXXXX`) charging $79 CAD.
4. **Beat Audio Preview Files:**
   - Upload full audio preview `.wav` or `.mp3` files into Supabase Storage `beats` bucket for remaining catalog items where `preview_url` is pending.

---

## 6. Rules for Future Agents

- **Do Not Rewrite Git History:** This repository syncs with Lovable. Never force-push or rebase pushed commits.
- **Always Validate Types:** Run `npx tsc --noEmit` before pushing changes.
- **Preserve Security Headers:** Ensure new external API endpoints or script origins are explicitly added to `vercel.json` CSP.
- **Keep Prices Consistent:** Ensure any UI changes reference `PRICES` in `src/data/beats.ts`.
