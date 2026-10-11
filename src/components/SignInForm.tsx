"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";
import AuthShell, { inputCls, labelCls, primaryBtn } from "./AuthShell";

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
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className={labelCls}>ইমেইল</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label htmlFor="password" className={labelCls}>পাসওয়ার্ড</label>
          <input id="password" name="password" type="password" autoComplete="current-password" placeholder="কমপক্ষে ৮ অক্ষর" className={inputCls} />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-up">{error}</p>}
        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading && <span className="loading loading-spinner loading-sm" />} সাইন ইন
        </button>
      </form>
      <div className="my-4 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />অথবা<span className="h-px flex-1 bg-line" /></div>
      <SocialButtons callbackURL={callbackUrl} />
      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট নেই? <Link href="/signup" className="text-brand hover:underline">সাইন আপ করুন</Link>
      </p>
    </AuthShell>
  );
}
