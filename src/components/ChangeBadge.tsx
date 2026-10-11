import { changeInfo } from "@/lib/bn";

export default function ChangeBadge({ change, className = "" }: { change: { dir: string; pct: number }; className?: string }) {
  const { dir, text } = changeInfo(change);
  const tone =
    dir === "up" ? "bg-green-100 text-green-700" : dir === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold sm:text-sm ${tone} ${className}`}>{text}</span>;
}
