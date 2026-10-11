import Image from "next/image";
import { bnDate } from "@/lib/bn";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-surface">
      <div className="flex flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between md:py-10">
        <div className="max-w-xl self-start md:self-center">
          <p className="mb-2 inline-block rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand" suppressHydrationWarning>{bnDate()}</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 text-base leading-6 text-muted">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-5 h-10 min-h-10 rounded-lg border-[#047f39] px-5 text-sm font-semibold shadow-sm">সব পণ্য দেখুন</a>
        </div>
        <Image src="/hero-basket.png" alt="ফলমূলে ভরা বাজারের ঝুড়ি" width={315} height={263} priority className="h-auto w-56 shrink-0 sm:w-72 md:w-[315px]" />
      </div>
    </section>
  );
}
