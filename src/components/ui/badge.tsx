import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-medium tracking-[0.24em] uppercase text-white/78 backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
