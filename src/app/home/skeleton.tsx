import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-lg shadow-md overflow-hidden bg-white">
          {/* Image Skeleton */}
          <Skeleton className="h-46 w-full" />

          <div className="p-4">
            {/* Price and Size Skeleton */}
            <Skeleton className="h-4 w-3/4 mb-2" />

            {/* Location Skeleton */}
            <Skeleton className="h-3 w-1/2" />
          </div>

          {/* Icons Skeleton */}
          <div className="flex justify-between items-center p-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
