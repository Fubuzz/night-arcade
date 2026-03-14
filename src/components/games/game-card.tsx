import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Game } from "@/lib/types";
import { statusLabel } from "@/lib/utils";

export function GameCard({ game }: { game: Game }) {
  return (
    <Panel className="group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/8">
      <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${game.accent}`} />
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge>{statusLabel(game.status)}</Badge>
            <h3 className="mt-4 text-2xl font-semibold text-white">{game.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">{game.tagline}</p>
          </div>
          <div className={`h-12 w-12 rounded-2xl bg-linear-to-br ${game.accent} opacity-90 shadow-[0_0_40px_rgba(56,189,248,0.18)]`} />
        </div>

        <div className="flex flex-wrap gap-2">
          {[game.genre, game.difficulty, ...game.tags].map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs text-white/65">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
            <p className="text-sm text-white/50">Peak metric</p>
            <p className="mt-2 text-lg font-semibold text-white">{game.heroMetric}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
            <p className="text-sm text-white/50">Avg session</p>
            <p className="mt-2 text-lg font-semibold text-white">{game.averageSession}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-white/55">{game.playersThisWeek} players this week</p>
          <Button href={`/games/${game.slug}`} className="px-4 py-2.5 text-sm">
            Open game
          </Button>
        </div>
      </div>
    </Panel>
  );
}
