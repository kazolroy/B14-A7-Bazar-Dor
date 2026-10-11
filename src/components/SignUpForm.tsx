"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";
import AuthShell, { inputCls, labelCls, primaryBtn } from "./AuthShell";

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
    const confirm = String(fd.get("confirm") ?? "");
    const fail = (msg: string) => { setError(msg); toast.error(msg); };
    if (!name) return fail("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) return fail(error.code === "USER_ALREADY_EXISTS" || /exist/i.test(error.message ?? "") ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে" : error.message || "রেজিস্ট্রেশন করা যায়নি");
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className={labelCls}>নাম</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>ইমেইল</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label htmlFor="password" className={labelCls}>পাসওয়ার্ড</label>
          <input id="password" name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" className={inputCls} />
        </div>
        <div>
          <label htmlFor="confirm" className={labelCls}>পাসওয়ার্ড নিশ্চিত করুন</label>
          <input id="confirm" name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" className={inputCls} />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-up">{error}</p>}
        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading && <span className="loading loading-spinner loading-sm" />} অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
      <div className="my-4 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />অথবা<span className="h-px flex-1 bg-line" /></div>
      <SocialButtons />
      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট আছে? <Link href="/signin" className="text-brand hover:underline">সাইন ইন করুন</Link>
      </p>
    </AuthShell>
  );
}
