export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-9 w-56" />
      <div className="skeleton h-44 w-full rounded-2xl" />
      <div className="skeleton h-96 w-full rounded-2xl" />
    </div>
  );
}
