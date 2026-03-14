import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { platformStats } from "@/lib/data";

export function Hero() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
      <div className="space-y-7">
        <Badge className="border-cyan-300/20 bg-cyan-300/8 text-cyan-100">Launching the nightly arcade era</Badge>
        <div className="space-y-5">
          <h1 className="max-w-4xl text-5xl font-semibold leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            One polished platform for every <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">night game obsession</span>.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
            Night Arcade turns quick mini-games into a persistent universe — shared identity, stacked rewards, global ranks, and a dashboard that makes every late-night run count.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href="/games">Explore the games</Button>
          <Button href="/dashboard" variant="secondary">
            View player dashboard
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {platformStats.map((stat) => (
            <Panel key={stat.label} className="px-5 py-5">
              <p className="text-sm text-white/50">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-white/55">{stat.hint}</p>
            </Panel>
          ))}
        </div>
      </div>

      <Panel className="relative overflow-hidden border-cyan-300/12 p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.18),transparent_30%)]" />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
            <div>
              <p className="text-sm text-white/50">Profile level</p>
              <p className="text-2xl font-semibold text-white">12</p>
            </div>
            <Badge className="border-emerald-300/20 bg-emerald-300/8 text-emerald-100">+480 XP this week</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <p className="text-sm text-white/55">Tonight&apos;s featured</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Orbit Drop</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Bend glowing capsules through collapsing lanes and chase global leaderboard heat.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <p className="text-sm text-white/55">Rewards queue</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">3 unlockables</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Titles, badges, and cosmetic flourishes ready to scaffold into a deeper progression loop.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-white/55">Momentum this week</p>
              <p className="text-sm text-cyan-200">Global rank #27</p>
            </div>
            <div className="h-32 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(15,23,42,0.2),rgba(15,23,42,0.9)),radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(244,114,182,0.16),transparent_30%)] p-4">
              <div className="flex h-full items-end gap-3">
                {[42, 58, 46, 72, 88, 76, 96].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t-full bg-linear-to-t from-cyan-400/30 via-sky-400/70 to-violet-400/90" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}
