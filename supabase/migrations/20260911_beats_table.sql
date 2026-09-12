-- Beat catalog moves from a static frontend file into a real table so new
-- beats can be added by a Trello-driven ingest pipeline without a code push.

create table public.beats (
  slug text primary key,
  title text not null,
  bpm integer not null,
  key text not null,
  mood text[] not null default '{}',
  description text not null,
  artwork_url text not null,
  preview_url text,
  exclusive_sold boolean not null default false,
  trello_card_id text unique,
  created_at timestamptz not null default now()
);

alter table public.beats enable row level security;

grant select on public.beats to anon, authenticated;

create policy "Beats are publicly readable"
on public.beats
for select
to anon, authenticated
using (true);

-- No insert/update/delete policy for anon/authenticated — only the
-- service-role ingest function (and this backfill) ever writes here.

insert into public.beats (slug, title, bpm, key, mood, description, artwork_url, preview_url, exclusive_sold, created_at)
values
  ('velvet-hours', 'Velvet Hours', 142, 'F minor', array['Late night', 'Trap soul'],
   'Slow-burning keys under a heavy 808 glide. Room for a full verse before the drop.',
   '/images/hero-velvet.jpg',
   'https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/velvet-hours.wav',
   false, now() - interval '6 days'),

  ('ice-water', 'Ice Water', 138, 'C# minor', array['Hard', 'Drill'],
   'Sliding bass, brittle hats and a cold string line that never lets up.',
   '/images/pendant-lol.jpg',
   'https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/ice-water.wav',
   false, now() - interval '5 days'),

  ('north-star', 'North Star', 90, 'A minor', array['Melodic', 'Anthem'],
   'Wide pads and a live-feel drum break built for a hook that carries.',
   '/images/chain-galaxy.jpg',
   'https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/north-star.wav',
   false, now() - interval '4 days'),

  ('platinum-chain', 'Platinum Chain', 148, 'G minor', array['Club', 'Bounce'],
   'Bright brass stabs over a bouncing pocket. Made to be loud in a car.',
   '/images/pendant-lol.jpg',
   'https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/platinum-chain.wav',
   false, now() - interval '3 days'),

  ('midnight-run', 'Midnight Run', 130, 'D minor', array['Cinematic', 'Dark'],
   'A patient build, then a low brass hit that opens the whole track up.',
   '/images/hero-velvet.jpg',
   'https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/midnight-run.wav',
   true, now() - interval '2 days'),

  ('clear-skies', 'Clear Skies', 96, 'E major', array['Warm', 'R&B'],
   'Soft electric guitar loop, brushed drums and space for layered vocals.',
   '/images/chain-galaxy.jpg',
   'https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/clear-skies.wav',
   false, now() - interval '1 day'),

  ('walk-it', 'Walk It', 155, 'E minor', array['Moody', 'Trap', 'Upbeat'],
   'A driving trap groove with a moody edge — energy that still moves.',
   '/images/pendant-lol.jpg',
   'https://jmespcsjkrucykzugsxn.supabase.co/storage/v1/object/public/beats/walk-it.wav',
   false, now());
