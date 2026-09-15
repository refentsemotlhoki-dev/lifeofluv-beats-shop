# Get the Lovable preview loading again

## What's wrong

Your live site on Vercel is fine. Only the Lovable preview is broken, and it's a settings problem, not a code problem.

The homepage (and every beats page) now reads the beat list from your database. On the live site the connection details are stored in Vercel, so it works. In the Lovable preview those connection details are simply absent, so the page fails before it can render and you get a blank/error screen.

Confirmed here: the preview returns an error reading "Missing Supabase environment variable(s)", and none of the connection values exist in this environment. The rest of the build compiles fine.

## The fix

1. Store your project's connection details for the preview environment: the project URL (`https://jmespcsjkrucykzugsxn.supabase.co`) and its public/publishable key, saved under both the browser-side and server-side names the code already looks for.
2. Reload the preview and confirm the homepage, the beats catalogue, and a single beat page all render with real beats and working audio previews.
3. Leave the live site, Stripe wiring, automations, and all other recent work untouched — no application code changes needed for this.

## Notes

- I need the **publishable (anon) key** for that project from you. It's a public key, safe to use in the browser, and it's the same one the live site already uses. I cannot read it from here.
- If you'd rather not paste it in chat, you can add it yourself in the project's environment/secrets settings and I'll verify the preview afterwards.
- Two small type warnings exist in the checkout files from earlier edits; they don't block the preview. I can clean them up separately if you want.

## Technical details

- Env names read by the code: `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (client) and `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` (SSR fallback in `src/integrations/supabase/client.ts`).
- `src/routes/index.tsx` calls `getLatestBeats` in its route loader; loaders are isomorphic, so `src/lib/beats.ts` runs the browser Supabase client during SSR and throws when env is missing. Once env is set this works; optionally the read could move behind a public server function later for cleaner SSR, but that is not required to unblock the preview.
- Secret-key/service-role values are not needed for these reads.
