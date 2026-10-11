import type { Metadata } from "next";
import "@fontsource/hind-siliguri/bengali-400.css";
import "@fontsource/hind-siliguri/bengali-500.css";
import "@fontsource/hind-siliguri/bengali-600.css";
import "@fontsource/hind-siliguri/bengali-700.css";
import "@fontsource/hind-siliguri/latin-400.css";
import "@fontsource/hind-siliguri/latin-600.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: { default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে", template: "%s | বাজার দর" },
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের বাজারদর ও দাম বাড়া-কমার তথ্য।",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛒</text></svg>" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <html lang="bn" data-theme="bazar">
      <body className="flex min-h-screen flex-col">
        <Navbar categories={categories} />
        <Ticker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
