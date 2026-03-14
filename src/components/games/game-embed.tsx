import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Game } from "@/lib/types";
import { getGameIntegration } from "@/lib/game-integrations";
import { cn } from "@/lib/utils";

export function GameEmbed({ game }: { game: Game }) {
  const integration = getGameIntegration(game.slug);

  if (!integration) {
    return (
      <Panel className="p-6 sm:p-8">
        <p className="text-sm font-medium tracking-[0.28em] uppercase text-cyan-200/78">Play surface</p>
        <div className={`mt-5 flex min-h-[320px] items-center justify-center rounded-[2rem] border border-white/10 bg-linear-to-br ${game.accent} p-[1px]`}>
          <div className="flex min-h-[318px] w-full items-center justify-center rounded-[calc(2rem-1px)] bg-slate-950/92 px-6 text-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/48">Integration unavailable</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Game runtime missing</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/58">
                This cabinet has platform scaffolding, but no mounted runtime yet.
              </p>
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-[0.28em] uppercase text-cyan-200/78">Play surface</p>
          <p className="mt-2 text-sm leading-6 text-white/56">
            {integration.notes ?? "Playable cabinet mounted inside the Night Arcade shell."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={integration.path} variant="secondary" className="px-4 py-2.5" >
            Open standalone
          </Button>
          <Button href="/auth" className="px-4 py-2.5">
            Save progress
          </Button>
        </div>
      </div>

      <div className={cn(`mt-5 rounded-[2rem] border border-white/10 bg-linear-to-br ${game.accent} p-[1px]`, integration.minHeightClassName)}>
        <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-1px)] bg-slate-950/96">
          <iframe
            key={integration.path}
            src={integration.path}
            title={`${game.title} playable cabinet`}
            className="h-full w-full border-0 bg-[#050816]"
            style={{ aspectRatio: integration.aspectRatio }}
            loading="eager"
            allow="fullscreen; autoplay"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/45">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Production-style embed</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Mobile-aware sizing</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Future cabinet architecture</span>
      </div>
    </Panel>
  );
}
