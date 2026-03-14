import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/auth", label: "Auth" },
];

export function SiteShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_28%),linear-gradient(180deg,#050816_0%,#090d1f_45%,#050816_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-6 sm:px-8 lg:px-10">
        <header className="mb-10 flex flex-col gap-5 rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-300 via-sky-500 to-violet-500 text-lg font-black text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.3)]">
              NA
            </div>
            <div>
              <Link href="/" className="text-lg font-semibold tracking-wide text-white">
                Night Arcade
              </Link>
              <p className="text-sm text-white/55">Nightly mini-games. Shared progression. Premium arcade energy.</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/72">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="/auth" variant="secondary" className="px-4 py-2.5">
              Sign in
            </Button>
            <Button href="/games" className="px-4 py-2.5">
              Play now
            </Button>
          </div>
        </header>

        <main className={cn("flex-1", className)}>{children}</main>
      </div>
    </div>
  );
}
