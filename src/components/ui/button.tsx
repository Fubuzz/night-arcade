import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

const base =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70";

const variants = {
  primary:
    "bg-linear-to-r from-cyan-400 via-sky-500 to-violet-500 text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.24)] hover:scale-[1.01] hover:shadow-[0_0_55px_rgba(99,102,241,0.3)]",
  secondary:
    "border border-white/12 bg-white/7 text-white hover:border-cyan-300/40 hover:bg-white/10",
  ghost: "text-white/72 hover:text-white",
};

export function Button({ children, href, className, variant = "primary" }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
