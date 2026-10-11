import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="skeleton mb-10 h-72 w-full rounded-3xl" />
      <GridSkeleton count={6} />
    </div>
  );
}
