import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-2xl border border-base-300 bg-white p-6 text-center shadow-sm sm:p-8">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className="mx-auto h-24 w-24 rounded-full object-cover" />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">{user.name.slice(0, 1).toUpperCase()}</div>
        )}
        <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
        <p className="text-base-content/60">{user.email}</p>
        <dl className="mt-6 divide-y divide-base-300 rounded-xl bg-base-200 text-left">
          <div className="flex justify-between px-4 py-3"><dt className="text-base-content/60">নাম</dt><dd className="font-medium">{user.name}</dd></div>
          <div className="flex justify-between gap-4 px-4 py-3"><dt className="text-base-content/60">ইমেইল</dt><dd className="truncate font-medium">{user.email}</dd></div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-6">তথ্য আপডেট করুন</Link>
      </div>
    </div>
  );
}
