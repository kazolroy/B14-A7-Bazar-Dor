"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const btn = "flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-line bg-surface px-2 text-[13px] font-semibold transition hover:bg-soft disabled:opacity-60";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [busy, setBusy] = useState<string | null>(null);

  async function go(provider: "google" | "github") {
    setBusy(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    if (error) {
      toast.error(`${provider === "google" ? "Google" : "GitHub"} দিয়ে লগইন করা যায়নি: ${error.message ?? "অনুগ্রহ করে আবার চেষ্টা করুন"}`);
      setBusy(null);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={() => go("google")} disabled={!!busy} className={btn}>
        {busy === "google" ? <span className="loading loading-spinner loading-xs" /> : <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>}
        <span>Google দিয়ে চালিয়ে যান</span>
      </button>
      <button type="button" onClick={() => go("github")} disabled={!!busy} className={btn}>
        {busy === "github" ? <span className="loading loading-spinner loading-xs" /> : <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>}
        <span>GitHub দিয়ে চালিয়ে যান</span>
      </button>
    </div>
  );
}
