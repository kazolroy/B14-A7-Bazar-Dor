import type { Metadata } from "next";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { inputCls, labelCls } from "@/components/AuthShell";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className="h-[70px] w-20 rounded-2xl object-cover" />
          ) : (
            <div className="flex h-[70px] w-20 items-center justify-center rounded-2xl bg-brand text-3xl font-bold text-white">{user.name.slice(0, 1).toUpperCase()}</div>
          )}
          <div className="min-w-0">
            <p className="truncate text-xl">{user.name}</p>
            <p className="truncate text-muted">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <div className="mt-6 px-0 sm:px-6 sm:pb-3">
          <label htmlFor="name" className={`${labelCls} text-xs`}>নাম</label>
          <input id="name" readOnly value={user.name} className={`${inputCls} mb-4 bg-surface`} />
          <Link href="/profile/update" className="btn btn-primary h-10 min-h-10 w-full rounded-lg border-[#047f39] text-sm font-semibold shadow-sm">আপডেট</Link>
        </div>
      </section>
    </div>
  );
}
