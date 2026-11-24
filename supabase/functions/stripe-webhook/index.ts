import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^14.10.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig || !endpointSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      const beatSlug = session.metadata?.beatSlug;
      const licenceType = session.metadata?.licenceType;

      if (orderId) {
        // 1. Mark order as paid
        const { error: orderError } = await supabase
          .from("orders")
          .update({
            status: "paid",
            stripe_session_id: session.id,
            stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
          })
          .eq("id", orderId);

        if (orderError) {
          console.error("Failed to update order status:", orderError);
        } else {
          console.log(`Order ${orderId} marked as paid successfully.`);
        }

        // 2. If exclusive purchase, mark beat as sold out across the store
        if (licenceType === "exclusive" && beatSlug) {
          const { error: beatError } = await supabase
            .from("beats")
            .update({ exclusive_sold: true })
            .eq("slug", beatSlug);

          if (beatError) {
            console.error(`Failed to mark beat ${beatSlug} exclusive_sold:`, beatError);
          } else {
            console.log(`Beat ${beatSlug} marked as exclusive_sold.`);
          }
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
