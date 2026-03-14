import { Hero } from "@/components/home/hero";
import { SiteShell } from "@/components/layout/site-shell";
import { GameCard } from "@/components/games/game-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { featuredGames, games } from "@/lib/data";
import { Panel } from "@/components/ui/panel";

export default function Home() {
  return (
    <SiteShell className="space-y-20 pb-10">
      <Hero />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Featured tonight"
          title="Two polished launch games, one evolving platform shell"
          description="Each game lives inside the same Night Arcade progression system, so scores, rewards, and identity stack instead of resetting every night."
        />
        <div className="grid gap-6 xl:grid-cols-2">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel className="p-6 sm:p-8">
          <SectionHeading
            eyebrow="Why it matters"
            title="Built for persistence, not disposable runs"
            description="Night Arcade gives every mini-game a shared shell: profile level, rank movement, rewards, recent activity, and future-ready data architecture."
          />
        </Panel>
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Persistent identity", body: "Shared profile level, badges, titles, and unlockables across all current and future games." },
              { title: "Leaderboard energy", body: "Per-game ladders plus global rank framing to create nightly momentum and return loops." },
              { title: "Extensible architecture", body: "Typed mock models and reusable UI make it easy to add new games without redesigning the platform." },
              { title: "Graceful auth path", body: "Runs beautifully with mock data now, then wires into Supabase auth and data when ready." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{item.body}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Game library"
          title="Current lineup"
          description="Seeded MVP entries can expand into a real catalog later with the same data model and route structure."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
