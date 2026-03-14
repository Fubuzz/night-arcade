import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { userProfile } from "@/lib/data";

export function ProfileOverview() {
  const progress = Math.round((userProfile.xp / userProfile.xpToNext) * 100);

  return (
    <Panel className="overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <Badge className="border-violet-300/20 bg-violet-300/8 text-violet-100">Global rank #{userProfile.rank}</Badge>
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white">{userProfile.name}</h1>
            <p className="mt-2 text-lg text-white/58">{userProfile.handle} · Night Arcade founding player profile</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Total playtime", value: userProfile.totalPlaytime },
            { label: "Win rate", value: userProfile.winRate },
            { label: "Daily streak", value: `${userProfile.dailyStreak} nights` },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-sm text-white/50">{item.label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/50">Level progress</p>
              <p className="mt-2 text-3xl font-semibold text-white">Level {userProfile.level}</p>
            </div>
            <p className="text-sm text-cyan-200">{userProfile.xp} / {userProfile.xpToNext} XP</p>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/8">
            <div className="h-full rounded-full bg-linear-to-r from-cyan-300 via-sky-400 to-violet-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm text-white/55">Profile level scaffold is ready for future XP rules and synced backend progression.</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-5">
          <p className="text-sm text-white/50">Rewards loadout</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {userProfile.badges.map((badge) => (
              <div key={badge.id} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                <p className="text-sm font-medium text-white">{badge.label}</p>
                <p className="mt-1 text-xs text-white/50">{badge.rarity} {badge.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
