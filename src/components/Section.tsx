export default function Section({ id, title, subtitle, icon, iconClass = "", children }: {
  id?: string; title: string; subtitle?: string; icon?: string; iconClass?: string; children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <div className="mb-3">
        <h2 className="flex items-center gap-2 text-xl font-bold leading-7">
          {icon && <span className={`text-base ${iconClass}`} aria-hidden>{icon}</span>}
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
