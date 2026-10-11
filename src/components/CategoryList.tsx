"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { toBn } from "@/lib/bn";
import ProductCard from "./ProductCard";

type Sort = "default" | "asc" | "desc";

export default function CategoryList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");
  // Prices arrive as real numbers (Bengali digits are only a display concern), so we sort numerically.
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-line bg-surface p-4">
        <label htmlFor="sort" className="text-sm text-muted">সাজান</label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-8 cursor-pointer appearance-none rounded-lg border border-[#1d271f] bg-surface pl-3 pr-8 text-xs shadow-sm focus-visible:outline-2 focus-visible:outline-brand"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <svg className="pointer-events-none absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M1.5 3.5 5 7l3.5-3.5" />
          </svg>
        </div>
      </div>
      <p className="text-sm text-muted">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
