import { changeInfo } from "@/lib/bn";

const TONE = { up: "text-up", down: "text-down", flat: "text-[#1d271f]/60" } as const;

/** Price change. Figma colours a price rise red (▲) and a fall green (▼). */
export default function ChangeBadge({
  change,
  variant = "pill",
  className = "",
}: {
  change: { dir: string; pct: number };
  variant?: "pill" | "text";
  className?: string;
}) {
  const { dir, text } = changeInfo(change);
  const tone = TONE[dir as keyof typeof TONE];
  if (variant === "text") return <span className={`font-semibold ${tone} ${className}`}>{text}</span>;
  return (
    <span className={`inline-flex items-center rounded-full bg-soft px-2 py-1 text-xs font-semibold leading-4 ${tone} ${className}`}>
      {text}
    </span>
  );
}
