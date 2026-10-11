"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="text-6xl" aria-hidden>⚠️</div>
      <h1 className="mt-3 text-2xl font-bold">ডেটা লোড করা যায়নি</h1>
      <p className="mt-2 text-base-content/70">সার্ভার থেকে দামের তথ্য আনতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।</p>
      <button onClick={reset} className="btn btn-primary mt-6">আবার চেষ্টা করুন</button>
    </div>
  );
}
