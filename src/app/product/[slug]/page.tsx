import type { Metadata } from "next";
import Link from "next/link";
import NotFoundView from "@/components/NotFoundView";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug, marketStats } from "@/lib/api";
import { bnAvg, bnPrice, unitLabel, unitShort } from "@/lib/bn";
import { requireSession } from "@/lib/session";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProductBySlug((await params).slug);
  return { title: p ? p.nameBn : "পাওয়া যায়নি" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`);
  const p = await getProductBySlug(slug);
  if (!p) return <NotFoundView message="এই পণ্যটি খুঁজে পাওয়া যায়নি।" />;

  const { min, max, avg } = marketStats(p);
  const rows = p.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);
  const diff = p.today - p.yesterday;
  const trend =
    diff === 0 ? (
      <>গতকালের তুলনায় আজ দাম <b>অপরিবর্তিত</b></>
    ) : (
      <>গতকালের তুলনায় আজ দাম <b>{diff > 0 ? "বেড়েছে" : "কমেছে"}</b> · {bnPrice(Math.abs(diff))} টাকা</>
    );

  const stats = [
    { label: "সর্বনিম্ন দাম", value: min, tone: "text-down", note: "সবচেয়ে কম দামের বাজার" },
    { label: "সর্বাধিক দাম", value: max, tone: "text-up", note: "সবচেয়ে বেশি দামের বাজার" },
    { label: "গড় দাম", value: avg, tone: "text-down", note: `প্রতি ${unitShort(p.unit)}-এর হিসাবে` },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <nav aria-label="breadcrumb" className="py-2 text-sm">
        <ol className="flex flex-wrap items-center">
          <li><Link href="/" className="hover:text-brand">হোম</Link></li>
          <li className="flex items-center"><span className="px-3 text-xs" aria-hidden>›</span><Link href={`/category/${p.category}`} className="hover:text-brand">{p.categoryNameBn}</Link></li>
          <li className="flex items-center"><span className="px-3 text-xs" aria-hidden>›</span><span aria-current="page">{p.nameBn}</span></li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-soft text-4xl" aria-hidden>{p.image}</span>
          <div>
            <h1 className="text-3xl font-bold leading-9">{p.nameBn}</h1>
            <p className="text-sm text-muted">{unitLabel(p.unit)} · {p.categoryNameBn}</p>
            <p className="mt-2 text-sm">{trend}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-soft px-5 py-4 text-center sm:min-w-[118px]">
          <p className="text-sm text-muted">আজকের দাম</p>
          <p className="text-3xl font-bold leading-9">{bnPrice(p.today)}</p>
          <p className="text-sm text-muted">টাকা / {unitShort(p.unit)}</p>
          <ChangeBadge change={p.change} variant="text" className="mt-1 inline-block text-sm" />
        </div>
      </header>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface px-6 py-4">
                <p className="text-xs text-muted">{s.label}</p>
                <p className={`mt-1 ${s.tone}`}><span className="text-xl font-bold">{bnPrice(s.value)}</span> <span className="text-sm">টাকা</span></p>
                <p className="mt-1 text-xs text-muted">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="px-4 py-3 text-left font-normal">বাজার</th>
                  <th className="px-4 py-3 text-left font-normal">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-normal">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-normal">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-normal">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m, i) => (
                  <tr key={m.market} className={`border-t border-line ${i % 2 === 1 ? "bg-soft" : ""}`}>
                    <td className="px-4 py-3">{m.market}</td>
                    <td className="px-4 py-3">{m.division}</td>
                    <td className="px-4 py-3 text-right">{bnPrice(m.min)} টাকা</td>
                    <td className="px-4 py-3 text-right">{bnPrice(m.max)} টাকা</td>
                    <td className="px-4 py-3 text-right font-bold">{bnAvg(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
