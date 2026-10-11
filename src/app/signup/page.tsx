import type { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm";

export const metadata: Metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return <div className="px-4 py-12"><SignUpForm /></div>;
}
