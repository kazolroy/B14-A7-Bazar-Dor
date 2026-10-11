import fallback from "./fallback-data.json";
import type { Category, Product } from "./types";

const BASE = "https://openapi.programming-hero.com/api/bazardor";

async function getJson<T>(path: string, fallbackValue: T): Promise<T> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch {
    // The live API is the source of truth; the bundled copy only keeps the UI alive if it is unreachable.
    return fallbackValue;
  }
}

export const getProducts = () => getJson<Product[]>("/products", fallback.products as Product[]);
export const getCategories = () => getJson<Category[]>("/categories", fallback.categories as Category[]);

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategoryWithProducts(slug: string) {
  const [cats, all] = await Promise.all([getCategories(), getProducts()]);
  const category = cats.find((c) => c.slug === slug) ?? null;
  if (!category) return null;
  return { category, products: all.filter((p) => p.category === slug) };
}

export function marketStats(p: Product) {
  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length;
  return { min, max, avg };
}
