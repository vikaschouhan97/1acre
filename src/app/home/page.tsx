import QueryProvider from "@/utils/queryProvider";
import React from "react";
import PropertyListings from "./cards";

const Page = () => {
  return (
    <div className="md:px-32 px-2 py-16 mt-12 max-w-[1920px] w-full">
      <QueryProvider>
        <PropertyListings />
      </QueryProvider>
    </div>
  );
};

export default Page;
