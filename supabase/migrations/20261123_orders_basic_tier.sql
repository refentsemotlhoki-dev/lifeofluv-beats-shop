-- Allow 'basic' tier in orders table check constraint
alter table public.orders drop constraint if exists orders_licence_type_check;

alter table public.orders add constraint orders_licence_type_check
  check (licence_type in ('basic', 'lease', 'exclusive'));
