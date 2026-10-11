export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-8" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>
      <div className="skeleton h-64 w-full rounded-2xl" />
    </div>
  );
}
