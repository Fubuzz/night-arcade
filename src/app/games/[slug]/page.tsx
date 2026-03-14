import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { LeaderboardTable } from "@/components/games/leaderboard-table";
import { getGameBySlug } from "@/lib/data";
import { statusLabel } from "@/lib/utils";

export function generateStaticParams() {
  return [
    { slug: "orbit-drop" },
    { slug: "stack-sprint" },
  ];
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <SiteShell className="space-y-8 pb-10">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="overflow-hidden p-6 sm:p-8">
          <Badge>{statusLabel(game.status)}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">{game.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">{game.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Peak metric", value: game.heroMetric },
              { label: "Average session", value: game.averageSession },
              { label: "Players this week", value: game.playersThisWeek },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-white/50">{stat.label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6 sm:p-8">
          <p className="text-sm font-medium tracking-[0.28em] uppercase text-cyan-200/78">Play surface</p>
          <div className={`mt-5 flex min-h-[320px] items-center justify-center rounded-[2rem] border border-white/10 bg-linear-to-br ${game.accent} p-[1px]`}>
            <div className="flex min-h-[318px] w-full items-center justify-center rounded-[calc(2rem-1px)] bg-slate-950/92 px-6 text-center">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/48">Future mount point</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Embedded game shell</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/58">
                  Ready for iframe, canvas, or custom runtime integration without reworking the surrounding platform UI.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="secondary">Launch preview</Button>
                  <Button href="/auth">Save progress</Button>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Panel className="p-6">
          <p className="text-sm font-medium tracking-[0.28em] uppercase text-cyan-200/78">Stats + rewards</p>
          <div className="mt-5 space-y-4">
            {game.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-white/55">{stat.label}</p>
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                </div>
                <p className="mt-2 text-sm text-white/50">{stat.hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm text-white/50">Unlockables preview</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {game.rewards.map((reward) => (
                <div key={reward.id} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                  <p className="font-medium text-white">{reward.label}</p>
                  <p className="mt-1 text-xs text-white/50">{reward.rarity} {reward.type}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <LeaderboardTable entries={game.leaderboard} />
      </section>
    </SiteShell>
  );
}
