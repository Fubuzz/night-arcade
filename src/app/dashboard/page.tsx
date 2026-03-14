import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ProfileOverview } from "@/components/dashboard/profile-overview";
import { SiteShell } from "@/components/layout/site-shell";
import { LeaderboardTable } from "@/components/games/leaderboard-table";
import { SectionHeading } from "@/components/shared/section-heading";
import { games } from "@/lib/data";
import { Panel } from "@/components/ui/panel";

const combinedLeaderboard = games
  .flatMap((game) => game.leaderboard)
  .sort((a, b) => b.score - a.score)
  .slice(0, 5);

export default function DashboardPage() {
  return (
    <SiteShell className="space-y-8 pb-10">
      <ProfileOverview />

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ActivityFeed />
        <Panel className="p-6">
          <SectionHeading
            eyebrow="Platform rank"
            title="Global momentum"
            description="This scaffold combines per-game output into a platform-level view so Night Arcade can evolve into a real meta progression system."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Global level", value: "12", hint: "Profile XP ladder" },
              { label: "Best standing", value: "#3", hint: "Current top personal placement" },
              { label: "Rewards earned", value: "03", hint: "Visible cosmetic progression" },
              { label: "Games tracked", value: `${games.length}`, hint: "Shared shell routes live now" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm text-white/50">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/55">{stat.hint}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <LeaderboardTable entries={combinedLeaderboard} />
    </SiteShell>
  );
}
