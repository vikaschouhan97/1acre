import QueryProvider from "@/utils/queryProvider";
import React from "react";
import PropertyCardSkeleton from "./skeleton";

const Page = () => {
  return (
    <div className="md:px-32 px-2 py-16 mt-12 max-w-[1920px] w-full">
      <PropertyCardSkeleton />
      <QueryProvider>
        <div></div>
      </QueryProvider>
    </div>
  );
};

export default Page;
