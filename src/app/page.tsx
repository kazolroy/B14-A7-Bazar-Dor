import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default async function Home() {
  const products = await getProducts();
  const risers = products.filter((p) => p.change.pct > 0).sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  const fallers = products.filter((p) => p.change.pct < 0).sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />
      <Section title="আজ দাম বেড়েছে" icon="▲" iconClass="text-up">
        <div className={grid}>{risers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>
      <Section title="আজ দাম কমেছে" icon="▼" iconClass="text-down">
        <div className={grid}>{fallers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>
      <Section id="সব-পণ্য" title="সব পণ্য" subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}>
        <div className={grid}>{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>
    </div>
  );
}
