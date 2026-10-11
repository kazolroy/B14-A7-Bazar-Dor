import type { Metadata } from "next";
import CategoryList from "@/components/CategoryList";
import NotFoundView from "@/components/NotFoundView";
import { getCategoryWithProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const data = await getCategoryWithProducts((await params).slug);
  return { title: data ? data.category.nameBn : "পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCategoryWithProducts(slug);

  if (!data || data.products.length === 0) {
    return <NotFoundView message="এই ধরনের কোনো পণ্য খুঁজে পাওয়া যায়নি।" />;
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm" aria-hidden>{data.category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{data.category.nameBn}</h1>
          <p className="text-base-content/60">{toBn(data.products.length)}টি পণ্যের আজকের দাম</p>
        </div>
      </div>
      <CategoryList products={data.products} />
    </div>
  );
}
