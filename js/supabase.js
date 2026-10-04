const SUPABASE_URL =
  "https://owtgzvvvnbmxtricerid.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

if (!window.supabase) {
  console.error("Supabase library was not loaded.");
}

const owinoSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

window.owinoSupabase = owinoSupabase;
