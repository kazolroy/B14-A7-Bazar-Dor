import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default async function Home() {
  const products = await getProducts();
  const risers = products.filter((p) => p.change.pct > 0).sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  const fallers = products.filter((p) => p.change.pct < 0).sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);

  return (
    <>
      <Hero />
      <Section title="আজ দাম বেড়েছে ▲" subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের">
        <div className={grid}>{risers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>
      <Section title="আজ দাম কমেছে ▼" subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের">
        <div className={grid}>{fallers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>
      <Section id="সব-পণ্য" title="সব পণ্য" subtitle={`মোট ${toBn(products.length)}টি নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম`}>
        <div className={grid}>{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>
    </>
  );
}
