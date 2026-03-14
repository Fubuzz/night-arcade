export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatScore(score: number) {
  return new Intl.NumberFormat("en-US").format(score);
}

export function statusLabel(status: "live" | "beta" | "coming-soon") {
  return status === "live"
    ? "Live now"
    : status === "beta"
      ? "Beta access"
      : "Coming soon";
}
