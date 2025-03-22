"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Property } from "@/utils/types";
import { Loader2 } from "lucide-react";
import PropertyCardSkeleton from "./skeleton";
import CarouselCards from "@/contents/CarouselCards";

export default function PropertyListings() {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProperties = async ({ pageParam = 1 }) => {
    if (pageParam === 1) setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lands/?seller=211&page=${pageParam}&page_size=10`
      );
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["properties"],
      queryFn: ({ pageParam = 1 }) => fetchProperties({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.next ? pages.length + 1 : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {isLoading && <PropertyCardSkeleton />}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
          {data?.pages.map((page) =>
            page.results.map((property: Property) => (
              <CarouselCards key={property?.id} property={property} />
            ))
          )}
          <div ref={ref} className="h-10"></div>
        </div>
      )}

      {isFetchingNextPage && (
        <div className="text-center w-full flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          Loading
        </div>
      )}
    </>
  );
}
