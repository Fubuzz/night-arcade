interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-medium tracking-[0.3em] uppercase text-cyan-200/80">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-white/62 sm:text-lg">{description}</p>
    </div>
  );
}
