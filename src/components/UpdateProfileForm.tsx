"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";
import { inputCls, labelCls, primaryBtn } from "./AuthShell";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return void toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return void toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    toast.success("আপনার তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-muted">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
      </div>
      <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <div className="mt-6 space-y-4 px-0 sm:px-6 sm:pb-3">
          <div>
            <label htmlFor="name" className={`${labelCls} text-xs`}>নাম</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" className={inputCls} />
          </div>
          <button type="submit" disabled={loading} className={primaryBtn}>
            {loading && <span className="loading loading-spinner loading-sm" />} তথ্য আপডেট করুন
          </button>
          <Link href="/profile" className="block text-center text-sm text-muted hover:text-brand">← প্রোফাইলে ফিরে যান</Link>
        </div>
      </form>
    </div>
  );
}
