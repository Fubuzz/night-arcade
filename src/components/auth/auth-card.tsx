import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { getAuthCapability, getSupabaseSetupSteps } from "@/lib/supabase";

export function AuthCard() {
  const auth = getAuthCapability();
  const steps = getSupabaseSetupSteps();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Panel className="p-6 sm:p-8">
        <Badge className={auth.configured ? "border-emerald-300/20 bg-emerald-300/8 text-emerald-100" : "border-amber-300/20 bg-amber-300/8 text-amber-100"}>
          {auth.configured ? "Auth ready" : "Preview mode"}
        </Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white">Sign in to keep every run, reward, and rivalry.</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/62">{auth.message}</p>

        <div className="mt-8 space-y-4">
          <Button variant={auth.google ? "primary" : "secondary"} className="w-full justify-center py-4">
            Continue with Google
          </Button>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
              placeholder="Email address"
              disabled={!auth.email}
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
              placeholder="Password"
              type="password"
              disabled={!auth.email}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant={auth.email ? "primary" : "secondary"}>Sign in</Button>
            <Button variant="secondary">Create account</Button>
          </div>
        </div>
      </Panel>

      <Panel className="p-6 sm:p-8">
        <p className="text-sm font-medium tracking-[0.28em] uppercase text-cyan-200/78">Supabase setup</p>
        <h2 className="mt-4 text-2xl font-semibold text-white">Graceful integration path</h2>
        <ol className="mt-6 space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-white/75">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-white/62">{step}</p>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
