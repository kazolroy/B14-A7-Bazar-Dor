export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="skeleton mt-4 h-14 w-full rounded-xl" />
    </div>
  );
}
export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
