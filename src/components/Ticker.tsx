import type { Product } from "@/lib/types";
import { bnPrice, unitShort } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function Ticker({ products }: { products: Product[] }) {
  const items = products.map((p) => (
    <span key={p.id} className="inline-flex items-center gap-1.5 whitespace-nowrap border-r border-soft px-4 py-2 text-sm">
      <span aria-hidden>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span>{bnPrice(p.today)} টাকা/{unitShort(p.unit)}</span>
      <ChangeBadge change={p.change} variant="text" />
    </span>
  ));
  return (
    <div className="marquee overflow-hidden border-b border-line bg-surface" aria-label="আজকের বাজার দর">
      <div className="marquee-track">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>{items}</div>
      </div>
    </div>
  );
}
