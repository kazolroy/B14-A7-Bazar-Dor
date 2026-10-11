import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton mb-8 h-56 w-full rounded-2xl" />
      <GridSkeleton count={8} />
    </div>
  );
}
