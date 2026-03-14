export type GameStatus = "live" | "beta" | "coming-soon";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Reward {
  id: string;
  label: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic";
  type: "badge" | "title" | "unlockable";
}

export interface LeaderboardEntry {
  id: string;
  player: string;
  score: number;
  streak: number;
  level: number;
  rankChange: number;
}

export interface GameStat {
  label: string;
  value: string;
  hint: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  genre: string;
  tags: string[];
  difficulty: Difficulty;
  status: GameStatus;
  accent: string;
  featured: boolean;
  heroMetric: string;
  averageSession: string;
  playersThisWeek: string;
  rewards: Reward[];
  stats: GameStat[];
  leaderboard: LeaderboardEntry[];
}

export interface UserProfile {
  name: string;
  handle: string;
  level: number;
  xp: number;
  xpToNext: number;
  rank: number;
  totalPlaytime: string;
  winRate: string;
  dailyStreak: number;
  badges: Reward[];
  recentActivity: {
    id: string;
    title: string;
    detail: string;
    timestamp: string;
  }[];
}

export interface AuthCapability {
  google: boolean;
  email: boolean;
  configured: boolean;
  message: string;
}
