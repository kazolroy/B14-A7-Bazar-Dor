import type { Product } from "@/lib/types";
import { bnPrice, unitShort } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function Ticker({ products }: { products: Product[] }) {
  const items = products.map((p) => (
    <span key={p.id} className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm">
      <span aria-hidden>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-base-content/70">
        {bnPrice(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <ChangeBadge change={p.change} className="!py-0 !text-xs" />
    </span>
  ));
  return (
    <div className="marquee overflow-hidden border-b border-base-300 bg-white py-2" aria-label="আজকের বাজার দর">
      <div className="marquee-track">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>{items}</div>
      </div>
    </div>
  );
}
