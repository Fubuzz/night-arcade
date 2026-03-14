import { Game, UserProfile } from "@/lib/types";

const rewards = {
  neonTrail: {
    id: "neon-trail",
    label: "Neon Trail",
    description: "Unlock a luminous trail effect for featured profile cards.",
    rarity: "Rare",
    type: "unlockable",
  },
  firstClear: {
    id: "first-clear",
    label: "First Clear",
    description: "Awarded for conquering your first nightly challenge.",
    rarity: "Common",
    type: "badge",
  },
  gravityAce: {
    id: "gravity-ace",
    label: "Gravity Ace",
    description: "A title granted to top Orbit Drop tacticians.",
    rarity: "Epic",
    type: "title",
  },
  stackSaint: {
    id: "stack-saint",
    label: "Stack Saint",
    description: "Precision stacking aura unlocked after a flawless run.",
    rarity: "Rare",
    type: "title",
  },
  midnightSignal: {
    id: "midnight-signal",
    label: "Midnight Signal",
    description: "A badge for showing up three nights in a row.",
    rarity: "Common",
    type: "badge",
  },
} as const satisfies Record<string, Game["rewards"][number]>;

export const games: Game[] = [
  {
    id: "orbit-drop",
    slug: "orbit-drop",
    title: "Orbit Drop",
    tagline: "Thread glowing capsules through collapsing gravity lanes.",
    description:
      "A reflex-heavy score chaser where every drop bends through unstable orbital rings. Built for fast sessions, leaderboard rivalry, and reward-driven mastery.",
    genre: "Arcade Physics",
    tags: ["Reflex", "Score Attack", "Neon"],
    difficulty: "Medium",
    status: "live",
    accent: "from-cyan-400 via-sky-500 to-violet-500",
    featured: true,
    heroMetric: "98.4K peak score",
    averageSession: "04m 12s",
    playersThisWeek: "1,284",
    rewards: [rewards.gravityAce, rewards.neonTrail, rewards.firstClear],
    integrationStatus: "embedded",
    integrationNotes: "Embedded as a portrait-first playable cabinet inside the Night Arcade shell.",
    stats: [
      { label: "Best Combo", value: "42x", hint: "Current top public chain" },
      { label: "Perfect Drops", value: "128", hint: "Most clean landings in one run" },
      { label: "Clear Rate", value: "63%", hint: "Players surviving the first vortex" },
    ],
    leaderboard: [
      { id: "o1", player: "NovaHex", score: 98420, streak: 9, level: 18, rankChange: 2 },
      { id: "o2", player: "Luma", score: 95210, streak: 6, level: 16, rankChange: -1 },
      { id: "o3", player: "Ahmed", score: 91480, streak: 4, level: 12, rankChange: 4 },
      { id: "o4", player: "PixelMint", score: 87640, streak: 5, level: 14, rankChange: 0 },
    ],
  },
  {
    id: "stack-sprint",
    slug: "stack-sprint",
    title: "Stack Sprint",
    tagline: "Race the timer by landing razor-clean towers under pressure.",
    description:
      "A rhythm-meets-precision builder where faster rounds reward cleaner placements. Designed for repeatable nightly runs and easy future event modifiers.",
    genre: "Precision Builder",
    tags: ["Timing", "Arcade", "Competitive"],
    difficulty: "Hard",
    status: "beta",
    accent: "from-fuchsia-400 via-rose-500 to-amber-400",
    featured: true,
    heroMetric: "31 floor perfect stack",
    averageSession: "03m 08s",
    playersThisWeek: "912",
    rewards: [rewards.stackSaint, rewards.midnightSignal, rewards.neonTrail],
    integrationStatus: "embedded",
    integrationNotes: "Embedded from the existing standalone Stack Sprint build found in the workspace.",
    stats: [
      { label: "Top Tower", value: "31", hint: "Highest flawless floor count" },
      { label: "Avg Accuracy", value: "94%", hint: "Placement precision among top 100" },
      { label: "Sudden Drop", value: "01m 48s", hint: "Fastest elite clear pace" },
    ],
    leaderboard: [
      { id: "s1", player: "CircuitBloom", score: 31240, streak: 7, level: 15, rankChange: 1 },
      { id: "s2", player: "Ahmed", score: 29810, streak: 4, level: 12, rankChange: 3 },
      { id: "s3", player: "ZenArc", score: 28490, streak: 8, level: 13, rankChange: -1 },
      { id: "s4", player: "HexaTune", score: 27920, streak: 2, level: 11, rankChange: 2 },
    ],
  },
];

export const userProfile: UserProfile = {
  name: "Ahmed",
  handle: "@ahmed",
  level: 12,
  xp: 2840,
  xpToNext: 3600,
  rank: 27,
  totalPlaytime: "18h 24m",
  winRate: "68%",
  dailyStreak: 4,
  badges: [rewards.firstClear, rewards.midnightSignal, rewards.neonTrail],
  recentActivity: [
    {
      id: "a1",
      title: "Orbit Drop personal best",
      detail: "Climbed to #3 global with a 91,480 run.",
      timestamp: "2h ago",
    },
    {
      id: "a2",
      title: "Unlocked Neon Trail",
      detail: "Reward earned for finishing two featured game objectives.",
      timestamp: "Yesterday",
    },
    {
      id: "a3",
      title: "Night streak extended",
      detail: "Logged in for four nights straight and kept the signal alive.",
      timestamp: "Yesterday",
    },
  ],
};

export const platformStats = [
  { label: "Games online", value: "02", hint: "Seeded tonight, architected for many more" },
  { label: "Global contenders", value: "2.1K", hint: "Mock community scale for leaderboard previews" },
  { label: "Rewards minted", value: "18", hint: "Badges, titles, and unlockables scaffolded" },
];

export const featuredGames = games.filter((game) => game.featured);

export const getGameBySlug = (slug: string) => games.find((game) => game.slug === slug);
