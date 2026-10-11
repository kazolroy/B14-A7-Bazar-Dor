import { Suspense } from "react";
import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <div>
      <Suspense fallback={<div className="skeleton mx-auto mt-10 h-96 max-w-md rounded-2xl" />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
