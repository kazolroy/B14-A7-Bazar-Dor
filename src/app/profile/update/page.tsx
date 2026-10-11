import type { Metadata } from "next";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdatePage() {
  const { user } = await requireSession("/profile/update");
  return <div className="px-4 py-12"><UpdateProfileForm currentName={user.name} /></div>;
}
