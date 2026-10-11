import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-accent to-base-200">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div className="text-center md:text-left">
          <p className="mb-3 inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-primary shadow-sm">
            ✅ প্রতিদিনের হালনাগাদ বাজারদর
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারে <span className="text-primary">কোনটার কত দাম</span>, জানুন এক নজরে
          </h1>
          <p className="mt-4 text-base text-base-content/70 sm:text-lg">
            ঢাকা, চট্টগ্রাম, রাজশাহী, ময়মনসিংহ, খুলনা ও সিলেটের বিভিন্ন বাজারের চাল, ডাল, তেল, সবজি, মাছ-মাংস ও মসলার দাম তুলনা করুন — বাজারে যাওয়ার আগেই।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-md mt-6 sm:btn-lg">সব পণ্যের দাম দেখুন ↓</a>
        </div>
        <div className="flex justify-center">
          <Image src="/hero-basket.png" alt="ফলমূলে ভরা বাজারের ঝুড়ি" width={420} height={351} priority className="h-auto w-64 sm:w-80 md:w-full md:max-w-md" />
        </div>
      </div>
    </section>
  );
}
