import Link from "next/link";
import type { Product } from "@/lib/types";
import { bnPrice, unitLabel } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-base-300 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-3xl" aria-hidden>
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold leading-tight group-hover:text-primary">{p.nameBn}</h3>
          <p className="text-sm text-base-content/60">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-base-200 px-3 py-2.5">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold">{bnPrice(p.today)} টাকা</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
