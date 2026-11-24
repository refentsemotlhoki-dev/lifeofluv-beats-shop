import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^14.10.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRICE_MAP: Record<string, { priceId: string; amountCad: number; name: string }> = {
  basic: {
    priceId: Deno.env.get("STRIPE_BASIC_PRICE_ID") || "price_1UfBMm02PMKPz5Ccd1a1p9PL",
    amountCad: 20,
    name: "LifeOfLuv — Basic Lease",
  },
  lease: {
    priceId: Deno.env.get("STRIPE_LEASE_PRICE_ID") || "price_1UfBN102PMKPz5CcLbG1xRx4",
    amountCad: 99,
    name: "LifeOfLuv — Unlimited Lease",
  },
  exclusive: {
    priceId: Deno.env.get("STRIPE_EXCLUSIVE_PRICE_ID") || "price_1UfBNG02PMKPz5CcSgs96afQ",
    amountCad: 399,
    name: "LifeOfLuv — Exclusive Rights",
  },
};

function makeOrderRef() {
  return `LOL-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      beatSlug,
      beatTitle,
      licenceType,
      licenseeName,
      licenseeEmail,
      signature,
      signedAt,
    } = body;

    // Validation
    if (!beatSlug || !beatTitle || !licenceType || !licenseeName || !licenseeEmail || !signature) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tier = PRICE_MAP[licenceType];
    if (!tier) {
      return new Response(
        JSON.stringify({ error: "licenceType must be 'basic', 'lease', or 'exclusive'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const orderRef = makeOrderRef();

    // 1. Create order record in database (pending status)
    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert({
        order_ref: orderRef,
        beat_slug: beatSlug,
        beat_title: beatTitle,
        licence_type: licenceType,
        price_cad: tier.amountCad,
        licensee_name: licenseeName,
        licensee_email: licenseeEmail,
        signature: signature,
        signed_at: signedAt || new Date().toISOString(),
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to create order record." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Origin for redirection
    const origin = req.headers.get("origin") || "https://lifeofluv-beats-shop.vercel.app";

    // 3. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: licenseeEmail,
      payment_method_types: ["card"],
      line_items: [
        {
          price: tier.priceId,
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order.id,
        orderRef: orderRef,
        beatSlug: beatSlug,
        beatTitle: beatTitle,
        licenceType: licenceType,
        licenseeName: licenseeName,
        licenseeEmail: licenseeEmail,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/${beatSlug}?licence=${licenceType}`,
    });

    return new Response(
      JSON.stringify({ url: session.url, orderRef }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Create checkout error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Something went wrong creating checkout session." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
