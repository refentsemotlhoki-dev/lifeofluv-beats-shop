ALTER FUNCTION public.sync_customer_account() SECURITY INVOKER;
GRANT UPDATE ON public.purchase_entitlements TO authenticated;
CREATE POLICY "Customers can claim purchases for their verified email"
ON public.purchase_entitlements FOR UPDATE TO authenticated
USING (
  purchaser_email = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
  AND (user_id IS NULL OR user_id = auth.uid())
)
WITH CHECK (
  purchaser_email = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
  AND user_id = auth.uid()
);
