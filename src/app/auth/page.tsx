import { AuthCard } from "@/components/auth/auth-card";
import { SiteShell } from "@/components/layout/site-shell";

export default function AuthPage() {
  return (
    <SiteShell className="space-y-8 pb-10">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm font-medium tracking-[0.28em] uppercase text-cyan-200/78">Authentication scaffold</p>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Sign in and sign up flows that fail gracefully when config is missing.</h1>
        <p className="text-lg leading-7 text-white/62">
          This MVP keeps the product usable with mock progression even before Supabase auth is wired, while making the upgrade path obvious.
        </p>
      </div>
      <AuthCard />
    </SiteShell>
  );
}
