-- Schedules the trello-beat-ingest edge function to run every 10 minutes.
-- The shared auth secret lives in Supabase Vault (set separately via
-- `select vault.create_secret(...)`, not committed here) and is pulled in
-- at execution time — never hardcoded in a migration file.

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'trello-beat-ingest',
  '*/10 * * * *',
  $$
  select net.http_post(
    url := 'https://jmespcsjkrucykzugsxn.supabase.co/functions/v1/trello-beat-ingest',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-ingest-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'trello_ingest_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
