-- Admin access: an email allowlist, an is_admin() check, and RLS so admins
-- (and only admins) can manage beats, read all orders, and upload to the
-- beats bucket from the browser.

create table public.admins (
  email text primary key check (email = lower(email))
);

alter table public.admins enable row level security;
-- No policies: the table is only readable through is_admin().

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to authenticated;
revoke all on function public.is_admin() from anon, public;

grant insert, update, delete on public.beats to authenticated;

create policy "Admins manage beats"
on public.beats
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins view all orders"
on public.orders
for select
to authenticated
using (public.is_admin());

create policy "Admins manage beats bucket objects"
on storage.objects
for all
to authenticated
using (bucket_id = 'beats' and public.is_admin())
with check (bucket_id = 'beats' and public.is_admin());

insert into public.admins (email) values ('refentsemotlhoki@gmail.com');
