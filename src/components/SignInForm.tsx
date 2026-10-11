"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("callbackUrl") ?? "/";
  const callbackUrl = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toasted = useRef(false);

  useEffect(() => {
    if (params.get("reason") === "protected" && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজটি দেখতে হলে আগে সাইন ইন করতে হবে");
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন";
      setError(msg);
      return void toast.error(msg);
    }
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      return void toast.error(msg);
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold">সাইন ইন করুন</h1>
      <p className="mt-1 text-base-content/60">আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input input-bordered w-full" />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="current-password" placeholder="••••••" className="input input-bordered w-full" />
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} সাইন ইন
        </button>
      </form>
      <div className="divider text-sm text-base-content/50">অথবা</div>
      <SocialButtons callbackURL={callbackUrl} />
      <p className="mt-6 text-center text-sm text-base-content/70">
        নতুন ব্যবহারকারী? <Link href="/signup" className="font-semibold text-primary hover:underline">সাইন আপ করুন</Link>
      </p>
    </div>
  );
}
