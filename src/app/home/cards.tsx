"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Property } from "@/utils/types";
import { Loader2 } from "lucide-react";
import PropertyCardSkeleton from "./skeleton";
import CarouselCards from "@/contents/CarouselCards";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { propertyDataActions } from "@/lib/slices/propertyData";
import GoogleMapComponent from "@/app/contents/GoogleMap";

const PropertyListings = () => {
  // Hook to track if the element is in view (for infinite scrolling)
  const { ref, inView } = useInView();
  
  // Local loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Redux hooks for dispatching actions and accessing properties from store
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.propertyData);

  /**
   * Function to fetch properties from API with pagination.
   * @param {Object} param0 - Contains the page parameter.
   */
  const fetchProperties = async ({ pageParam = 1 }) => {
    if (pageParam === 1) setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lands/?seller=211&page=${pageParam}&page_size=10`
      );
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data = await res.json();
      dispatch(propertyDataActions.addProperties(data.results));
      return data;
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Infinite query for handling paginated data fetching
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["properties"],
    queryFn: ({ pageParam = 1 }) => fetchProperties({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.next ? pages.length + 1 : undefined,
    refetchOnWindowFocus: false, // Prevent refetching when tab regains focus
    refetchOnReconnect: false, // Prevent refetching when internet reconnects
    staleTime: 1000 * 60 * 10, // Data is considered fresh for 10 minutes
  });

  // Trigger fetch when the last item comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {/* Show skeleton loader while fetching initial data */}
      {isLoading && <PropertyCardSkeleton />}
      
      {/* Display Google Map */}
      <GoogleMapComponent />

      {/* Show property listings once loading is complete */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-6">
          {properties?.map((property: Property) => (
            <CarouselCards key={property?.id} property={property} />
          ))}
          {/* Infinite scroll trigger element */}
          <div ref={ref} className="h-10"></div>
        </div>
      )}

      {/* Show loader when fetching additional pages */}
      {isFetchingNextPage && (
        <div className="text-center w-full flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          Loading
        </div>
      )}
    </>
  );
};

// Optimize re-renders by using React.memo
export default React.memo(PropertyListings);
