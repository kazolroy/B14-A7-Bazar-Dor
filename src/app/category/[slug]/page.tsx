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
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5">
        <span className="text-4xl" aria-hidden>{data.category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold leading-8">{data.category.nameBn}</h1>
          <p className="text-sm text-muted">{toBn(data.products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>
      <CategoryList products={data.products} />
    </div>
  );
}
