import type { Metadata } from "next";
import Link from "next/link";
import NotFoundView from "@/components/NotFoundView";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug, marketStats } from "@/lib/api";
import { bnPrice, toBn, unitLabel } from "@/lib/bn";
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
  const byDivision = p.markets.reduce<Record<string, typeof p.markets>>((acc, m) => {
    (acc[m.division] ??= []).push(m);
    return acc;
  }, {});
  const diff = p.today - p.yesterday;
  const summary = `${p.nameBn} আজ ${unitLabel(p.unit)} ${bnPrice(p.today)} টাকায় বিক্রি হচ্ছে — গতকাল ছিল ${bnPrice(p.yesterday)} টাকা${
    diff === 0 ? "; দাম অপরিবর্তিত।" : diff > 0 ? `; ${bnPrice(diff)} টাকা বেড়েছে।` : `; ${bnPrice(-diff)} টাকা কমেছে।`
  }`;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: min, tone: "text-green-700" },
    { label: "সর্বোচ্চ দাম", value: max, tone: "text-red-700" },
    { label: "গড় দাম", value: avg, tone: "text-base-content" },
  ];
  const history = [
    { label: "আজ", v: p.today },
    { label: "গতকাল", v: p.yesterday },
    { label: "গত সপ্তাহ", v: p.lastWeek },
    { label: "গত মাস", v: p.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-sm text-base-content/60" aria-label="breadcrumb">
        <Link href="/" className="hover:text-primary">হোম</Link> <span aria-hidden>/</span>{" "}
        <Link href={`/category/${p.category}`} className="hover:text-primary">{p.categoryNameBn}</Link>
      </nav>

      <section className="rounded-2xl border border-base-300 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-4xl sm:h-20 sm:w-20 sm:text-5xl" aria-hidden>{p.image}</span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{p.nameBn}</h1>
              <p className="mt-1 max-w-xl text-base-content/70">{summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <Link href={`/category/${p.category}`} className="badge badge-lg border-0 bg-accent font-medium text-primary">{p.categoryIcon} {p.categoryNameBn}</Link>
                <span className="badge badge-lg badge-ghost">{unitLabel(p.unit)}</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-base-200 px-5 py-3 text-center sm:text-right">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className="text-3xl font-bold text-primary">{bnPrice(p.today)} <span className="text-base font-medium">টাকা</span></p>
            <ChangeBadge change={p.change} className="mt-1" />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="দামের সারসংক্ষেপ">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-base-300 bg-white p-5">
            <p className="text-sm text-base-content/60">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.tone}`}>{bnPrice(s.value)} টাকা</p>
            <p className="text-xs text-base-content/50">{unitLabel(p.unit)}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-base-300 bg-white p-5">
        <h2 className="mb-3 text-lg font-bold">দামের ধারা</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {history.map((h) => (
            <div key={h.label} className="rounded-xl bg-base-200 px-4 py-3">
              <p className="text-sm text-base-content/60">{h.label}</p>
              <p className="text-lg font-semibold">{bnPrice(h.v)} টাকা</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <p className="mb-4 text-base-content/60">{toBn(p.markets.length)}টি বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম ({unitLabel(p.unit)})</p>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(byDivision).map(([division, markets]) => (
            <div key={division} className="overflow-hidden rounded-2xl border border-base-300 bg-white">
              <h3 className="border-b border-base-300 bg-accent px-4 py-2.5 font-bold text-primary">📍 {division} বিভাগ</h3>
              <table className="table">
                <thead>
                  <tr><th>বাজার</th><th className="text-right">সর্বনিম্ন</th><th className="text-right">সর্বোচ্চ</th></tr>
                </thead>
                <tbody>
                  {markets.map((m) => (
                    <tr key={m.market}>
                      <td className="font-medium">{m.market}</td>
                      <td className="text-right text-green-700">{bnPrice(m.min)} টাকা</td>
                      <td className="text-right text-red-700">{bnPrice(m.max)} টাকা</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
