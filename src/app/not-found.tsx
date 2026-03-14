import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export default function NotFound() {
  return (
    <SiteShell className="flex items-center justify-center pb-10">
      <Panel className="max-w-2xl p-8 text-center sm:p-10">
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-cyan-200/78">404 signal lost</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white">That cabinet doesn&apos;t exist yet.</h1>
        <p className="mt-4 text-lg leading-7 text-white/60">
          The route you tried to open is outside tonight&apos;s arcade lineup. Head back to the lobby and pick a live cabinet.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/games">Browse games</Button>
          <Link href="/" className="inline-flex items-center rounded-full px-4 py-3 text-sm font-semibold text-white/70 hover:text-white">
            Back home
          </Link>
        </div>
      </Panel>
    </SiteShell>
  );
}
