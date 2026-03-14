import { cn } from "@/lib/utils";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/6 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
