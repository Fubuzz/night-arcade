export type GameIntegrationMode = "iframe";

export interface GameIntegration {
  slug: string;
  mode: GameIntegrationMode;
  title: string;
  path: string;
  aspectRatio: string;
  minHeightClassName: string;
  notes?: string;
}

export const gameIntegrations: Record<string, GameIntegration> = {
  "orbit-drop": {
    slug: "orbit-drop",
    mode: "iframe",
    title: "Orbit Drop",
    path: "/games/orbit-drop/index.html",
    aspectRatio: "4 / 5",
    minHeightClassName: "min-h-[620px] sm:min-h-[760px] lg:min-h-[820px]",
    notes: "Embedded portrait-first arcade drop with local leaderboard persistence.",
  },
  "stack-sprint": {
    slug: "stack-sprint",
    mode: "iframe",
    title: "Stack Sprint",
    path: "/games/stack-sprint/index.html",
    aspectRatio: "16 / 9",
    minHeightClassName: "min-h-[360px] sm:min-h-[480px] lg:min-h-[620px]",
    notes: "Embedded static canvas runner sourced from the existing workspace game build.",
  },
};

export function getGameIntegration(slug: string) {
  return gameIntegrations[slug];
}
