"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
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
    <>
      <div className="mb-5 flex items-center gap-2">
        <label htmlFor="sort" className="text-sm font-medium text-base-content/70">সাজান:</label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="select select-bordered select-sm appearance-none bg-white pr-9 sm:select-md"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/60" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M5.5 7.5 10 12l4.5-4.5-1.1-1.1L10 9.8 6.6 6.4z" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
