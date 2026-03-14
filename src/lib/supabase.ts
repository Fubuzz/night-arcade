import { AuthCapability } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getAuthCapability(): AuthCapability {
  if (isSupabaseConfigured) {
    return {
      google: true,
      email: true,
      configured: true,
      message: "Supabase auth is configured. Wire these buttons to your preferred auth flows next.",
    };
  }

  return {
    google: false,
    email: false,
    configured: false,
    message:
      "Supabase env vars are missing, so auth actions are running in preview mode only. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable real sign-in.",
  };
}

export function getSupabaseSetupSteps() {
  return [
    "Create a Supabase project.",
    "Enable Google and email/password providers in Authentication.",
    "Add NEXT_PUBLIC_SUPABASE_URL to your environment.",
    "Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.",
    "Deploy to Vercel with the same env vars.",
  ];
}
