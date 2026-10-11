"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

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
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-base-content/60">আপনার প্রোফাইলের নাম পরিবর্তন করুন</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" placeholder="আপনার নাম" />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} তথ্য আপডেট করুন
        </button>
        <Link href="/profile" className="btn btn-ghost w-full">বাতিল</Link>
      </form>
    </div>
  );
}
