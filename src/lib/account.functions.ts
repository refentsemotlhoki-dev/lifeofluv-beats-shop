import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getCustomerLibrary = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { error: syncError } = await context.supabase.rpc("sync_customer_account");
    if (syncError) throw new Error("We couldn't sync your purchases right now.");

    const [{ data: profile, error: profileError }, { data: purchases, error: purchaseError }] =
      await Promise.all([
        context.supabase
          .from("profiles")
          .select("display_name, email")
          .eq("user_id", context.userId)
          .single(),
        context.supabase
          .from("purchase_entitlements")
          .select(
            "id, beat_slug, beat_title, licence_type, amount_cad, purchased_at, download_url, agreement_url",
          )
          .order("purchased_at", { ascending: false }),
      ]);

    if (profileError || purchaseError) throw new Error("We couldn't load your account right now.");
    return { profile, purchases: purchases ?? [] };
  });

export const updateDisplayName = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ displayName: z.string().trim().min(2).max(120) }).parse(input))
  .handler(async ({ data, context }) => {
    const email = typeof context.claims.email === "string" ? context.claims.email.toLowerCase() : "";
    if (!email) throw new Error("Your account does not have a verified email.");

    const { error } = await context.supabase.from("profiles").upsert({
      user_id: context.userId,
      email,
      display_name: data.displayName,
    });
    if (error) throw new Error("We couldn't save your name.");
    return { ok: true };
  });