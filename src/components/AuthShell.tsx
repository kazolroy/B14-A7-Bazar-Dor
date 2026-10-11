import Link from "next/link";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-stretch px-4 pb-12 pt-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="mt-6 rounded-2xl border border-line bg-surface p-6">{children}</div>
      <Link href="/" className="mt-6 text-center text-sm text-muted hover:text-brand">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}

export const inputCls = "h-10 w-full rounded-lg border border-line bg-white px-3.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
export const labelCls = "mb-1.5 block text-sm";
export const primaryBtn = "btn btn-primary h-10 min-h-10 w-full rounded-lg border-[#047f39] text-sm font-semibold shadow-sm";
