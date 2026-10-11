import type { Category, Product } from "./types";

// Official assignment API. (API_BASE only exists so the base URL can be overridden in tests.)
const BASE = process.env.API_BASE ?? "https://openapi.programming-hero.com/api/bazardor";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`BazarDor API ${path} failed: HTTP ${res.status}`);
  return (await res.json()) as T;
}

export const getProducts = () => getJson<Product[]>("/products");
export const getCategories = () => getJson<Category[]>("/categories");

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
