import Link from "next/link";
import type { Product } from "@/lib/types";
import { bnPrice, unitLabel } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-line bg-surface p-4 transition hover:border-brand/50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-soft text-2xl" aria-hidden>{p.image}</span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6">{p.nameBn}</h3>
          <p className="text-xs leading-4 text-muted">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs leading-4 text-muted">আজকের দাম</p>
          <p className="leading-7"><span className="text-xl font-bold">{bnPrice(p.today)}</span> <span className="text-sm">টাকা</span></p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
