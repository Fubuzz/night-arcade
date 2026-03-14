import { GameCard } from "@/components/games/game-card";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { games } from "@/lib/data";

export default function GamesPage() {
  return (
    <SiteShell className="space-y-8 pb-10">
      <SectionHeading
        eyebrow="Library"
        title="Tonight's lineup, framed like the start of a real platform"
        description="Every game gets a dedicated route, its own stats and leaderboard surface, and a future-friendly mount point for the actual playable experience."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </SiteShell>
  );
}
