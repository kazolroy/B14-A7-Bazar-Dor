export default function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 pt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="mt-1 text-base-content/60">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
