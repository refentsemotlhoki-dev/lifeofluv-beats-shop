import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ZIP_URL_TTL_SECONDS = 300;

export const getMyBeats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Link any past guest-checkout orders whose email matches this verified
    // account, the first time this runs for a given order.
    const { error: claimError } = await context.supabase.rpc("claim_orders_for_current_user");
    if (claimError) throw new Error("We couldn't sync your purchases right now.");

    // RLS already scopes this to the caller's own claimed, paid orders.
    const { data: orders, error: ordersError } = await context.supabase
      .from("orders")
      .select("id, order_ref, beat_slug, beat_title, licence_type, price_cad, signed_at, delivery_zip_key")
      .order("signed_at", { ascending: false });

    if (ordersError) throw new Error("We couldn't load your purchases right now.");

    const zipKeys = (orders ?? [])
      .map((order) => order.delivery_zip_key)
      .filter((key): key is string => Boolean(key));

    const signedUrlByKey = new Map<string, string>();
    if (zipKeys.length > 0) {
      // Service-role client only ever touches keys already proven to belong
      // to this caller by the RLS-scoped read above.
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: signedUrls, error: signError } = await supabaseAdmin.storage
        .from("order-files")
        .createSignedUrls(zipKeys, ZIP_URL_TTL_SECONDS);

      if (!signError && signedUrls) {
        for (const entry of signedUrls) {
          if (entry.signedUrl && !entry.error) {
            signedUrlByKey.set(entry.path ?? "", entry.signedUrl);
          }
        }
      }
    }

    return {
      purchases: (orders ?? []).map((order) => ({
        id: order.id,
        orderRef: order.order_ref,
        beatTitle: order.beat_title,
        licenceType: order.licence_type,
        priceCad: order.price_cad,
        signedAt: order.signed_at,
        downloadUrl: order.delivery_zip_key ? signedUrlByKey.get(order.delivery_zip_key) ?? null : null,
      })),
    };
  });
