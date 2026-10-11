"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const fail = (msg: string) => { setError(msg); toast.error(msg); };
    if (!name) return fail("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 6) return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) return fail(error.code === "USER_ALREADY_EXISTS" || /exist/i.test(error.message ?? "") ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে" : error.message || "রেজিস্ট্রেশন করা যায়নি");
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">নতুন অ্যাকাউন্ট খুলুন</h1>
      <p className="mt-1 text-base-content/60">বিনামূল্যে রেজিস্টার করে সব পণ্যের বিস্তারিত দাম দেখুন</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input name="name" type="text" autoComplete="name" placeholder="আপনার নাম" className="input input-bordered w-full" />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input input-bordered w-full" />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৬ অক্ষর" className="input input-bordered w-full" />
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} রেজিস্টার
        </button>
      </form>
      <div className="divider text-sm text-base-content/50">অথবা</div>
      <SocialButtons />
      <p className="mt-6 text-center text-sm text-base-content/70">
        আগেই অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-primary hover:underline">সাইন ইন করুন</Link>
      </p>
    </div>
  );
}
