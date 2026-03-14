import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { LeaderboardEntry } from "@/lib/types";
import { formatScore } from "@/lib/utils";

export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/50">Leaderboard</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Tonight&apos;s top contenders</h3>
          </div>
          <Badge className="border-cyan-300/20 bg-cyan-300/8 text-cyan-100">Seeded MVP data</Badge>
        </div>
      </div>
      <div className="divide-y divide-white/8">
        {entries.map((entry, index) => (
          <div key={entry.id} className="grid gap-3 px-6 py-4 sm:grid-cols-[60px_1.2fr_1fr_1fr_110px] sm:items-center">
            <div className="text-sm font-medium text-white/55">#{index + 1}</div>
            <div>
              <p className="font-medium text-white">{entry.player}</p>
              <p className="text-sm text-white/50">Level {entry.level} contender</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Score</p>
              <p className="font-semibold text-white">{formatScore(entry.score)}</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Streak</p>
              <p className="font-semibold text-white">{entry.streak} nights</p>
            </div>
            <div className={entry.rankChange >= 0 ? "text-emerald-300" : "text-rose-300"}>
              {entry.rankChange >= 0 ? `↑ ${entry.rankChange}` : `↓ ${Math.abs(entry.rankChange)}`}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
