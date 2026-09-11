CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.profiles (
  user_id uuid PRIMARY KEY,
  display_name text NOT NULL DEFAULT '',
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT profiles_display_name_length CHECK (char_length(display_name) <= 120),
  CONSTRAINT profiles_email_normalized CHECK (email = lower(trim(email)))
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view their profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Customers can create their profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND email = lower(trim(coalesce(auth.jwt() ->> 'email', ''))));
CREATE POLICY "Customers can update their profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND email = lower(trim(coalesce(auth.jwt() ->> 'email', ''))));
CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.purchase_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchaser_email text NOT NULL,
  user_id uuid,
  beat_slug text NOT NULL,
  beat_title text NOT NULL,
  licence_type text NOT NULL CHECK (licence_type IN ('lease', 'exclusive')),
  amount_cad integer NOT NULL CHECK (amount_cad > 0),
  payment_reference text UNIQUE,
  download_url text,
  agreement_url text,
  purchased_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT purchase_email_normalized CHECK (purchaser_email = lower(trim(purchaser_email)))
);
GRANT SELECT ON public.purchase_entitlements TO authenticated;
GRANT ALL ON public.purchase_entitlements TO service_role;
ALTER TABLE public.purchase_entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view purchases for their verified email"
ON public.purchase_entitlements FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR purchaser_email = lower(trim(coalesce(auth.jwt() ->> 'email', '')))
);
CREATE INDEX purchase_entitlements_email_idx ON public.purchase_entitlements (purchaser_email);
CREATE INDEX purchase_entitlements_user_idx ON public.purchase_entitlements (user_id);
CREATE TRIGGER purchase_entitlements_set_updated_at
BEFORE UPDATE ON public.purchase_entitlements
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.sync_customer_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  account_email text := lower(trim(coalesce(auth.jwt() ->> 'email', '')));
  account_name text := coalesce(auth.jwt() -> 'user_metadata' ->> 'display_name', auth.jwt() -> 'user_metadata' ->> 'full_name', '');
BEGIN
  IF auth.uid() IS NULL OR account_email = '' THEN
    RAISE EXCEPTION 'Authenticated account email required';
  END IF;

  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (auth.uid(), account_name, account_email)
  ON CONFLICT (user_id) DO UPDATE
  SET email = EXCLUDED.email,
      display_name = CASE WHEN public.profiles.display_name = '' THEN EXCLUDED.display_name ELSE public.profiles.display_name END,
      updated_at = now();

  UPDATE public.purchase_entitlements
  SET user_id = auth.uid(), updated_at = now()
  WHERE purchaser_email = account_email
    AND (user_id IS NULL OR user_id = auth.uid());
END;
$$;
GRANT EXECUTE ON FUNCTION public.sync_customer_account() TO authenticated;
REVOKE ALL ON FUNCTION public.sync_customer_account() FROM anon;
