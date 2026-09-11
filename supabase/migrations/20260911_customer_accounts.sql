-- Customer accounts: link orders to Supabase Auth users, add a place to
-- persist the fulfillment zip for later re-download from My Beats.

alter table public.orders
  add column user_id uuid references auth.users(id) on delete set null;

alter table public.orders
  add column delivery_zip_key text;

comment on column public.orders.user_id is
  'Set by claim_orders_for_current_user() the first time the purchasing email signs in via magic link.';
comment on column public.orders.delivery_zip_key is
  'Object key in the private order-files bucket for the zip built at fulfillment time by stripe-webhook. Null if pre-dates this column or upload failed.';

create index orders_licensee_email_idx on public.orders (lower(licensee_email));
create index orders_user_id_idx on public.orders (user_id);

grant select on public.orders to authenticated;

create policy "Customers can view their claimed paid orders"
on public.orders
for select
to authenticated
using (user_id = auth.uid() and status = 'paid');

create or replace function public.claim_orders_for_current_user()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  account_email text := lower(trim(coalesce(auth.jwt() ->> 'email', '')));
  claimed_count integer;
begin
  if auth.uid() is null or account_email = '' then
    raise exception 'Authenticated account email required';
  end if;

  update public.orders
  set user_id = auth.uid()
  where lower(trim(licensee_email)) = account_email
    and status = 'paid'
    and user_id is null;

  get diagnostics claimed_count = row_count;
  return claimed_count;
end;
$$;

grant execute on function public.claim_orders_for_current_user() to authenticated;
revoke all on function public.claim_orders_for_current_user() from anon, public;

insert into storage.buckets (id, name, public)
values ('order-files', 'order-files', false);
