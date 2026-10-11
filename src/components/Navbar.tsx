"use client";
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

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
      active ? "bg-primary text-white shadow-sm" : "text-base-content/80 hover:bg-accent hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl text-white" aria-hidden>🛒</span>
          <span className="leading-tight">
            <span className="block text-xl font-bold text-primary">বাজার দর</span>
            <span className="block text-xs text-base-content/60" suppressHydrationWarning>{bnDate()}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28 rounded-full" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="flex items-center gap-2 rounded-full border border-base-300 py-1 pl-1 pr-3 hover:bg-accent" aria-label="প্রোফাইল মেনু">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {session.user.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{session.user.name}</span>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-base-300 bg-white p-2 shadow-lg">
                <li><Link href="/profile">আমার প্রোফাইল</Link></li>
                <li><button onClick={handleSignOut} className="text-error">সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-outline btn-primary sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm btn-primary sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300/70" aria-label="পণ্যের ধরন">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          <Link href="/" className={chip(pathname === "/")}>সব পণ্য</Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/category/${c.slug}`} className={chip(pathname === `/category/${c.slug}`)}>
              <span aria-hidden>{c.icon} </span>{c.nameBn}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
