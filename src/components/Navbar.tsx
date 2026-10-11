"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Category } from "@/lib/types";
import { bnDate } from "@/lib/bn";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  async function handleSignOut() {
    await signOut();
    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const initial = session?.user.name.slice(0, 1).toUpperCase();
  const firstName = session?.user.name.split(" ")[0];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-lg text-white" aria-hidden>🛒</span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-xs text-muted" suppressHydrationWarning>{bnDate()}</span>
          </span>
        </Link>

        {isPending ? (
          <div className="skeleton h-10 w-28 rounded-lg" />
        ) : session ? (
          <div className="relative" ref={menuRef}>
            <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-soft">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="" className="h-9 w-9 rounded-[10px] object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand font-bold text-white">{initial}</span>
              )}
              <span className="max-w-24 truncate">{firstName}</span>
              <span className="text-[10px] text-muted" aria-hidden>▼</span>
            </button>
            {open && (
              <div role="menu" className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-line bg-surface p-2 shadow-lg">
                <div className="px-3 py-2">
                  <p className="text-sm">{session.user.name}</p>
                  <p className="truncate text-xs">{session.user.email}</p>
                </div>
                <Link role="menuitem" href="/profile" className="block rounded-lg px-3 py-1.5 text-sm hover:bg-soft">👤 আমার প্রোফাইল</Link>
                <button role="menuitem" onClick={handleSignOut} className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-up hover:bg-soft">↩ সাইন আউট</button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-ghost btn-sm h-10 text-sm font-semibold sm:px-4">সাইন ইন</Link>
            <Link href="/signup" className="btn btn-primary btn-sm h-10 rounded-lg border-[#047f39] text-sm font-semibold shadow-sm sm:px-5">সাইন আপ</Link>
          </div>
        )}
      </div>

      <nav className="border-t border-soft bg-surface" aria-label="পণ্যের ধরন">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-xs font-semibold transition ${active ? "bg-brand text-white shadow-sm" : "hover:bg-soft"}`}
              >
                <span aria-hidden>{c.icon}</span>{c.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
