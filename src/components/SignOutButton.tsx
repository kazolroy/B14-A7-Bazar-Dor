"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut();
        toast.success("সফলভাবে সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
      }}
      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-up px-4 text-sm font-semibold text-up transition hover:bg-red-50"
    >
      ↩ সাইন আউট
    </button>
  );
}
