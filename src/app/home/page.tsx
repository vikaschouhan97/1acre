"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import QueryProvider from "@/utils/queryProvider";
import React, { useEffect } from "react";
import PropertyListings from "./cards";

const Page = () => {
    useEffect(() => {
        AOS.init();
      }, []);
  return (
    <div className="md:px-32 px-2 py-16 mt-12 max-w-[1920px] w-full">
      <QueryProvider>
        <PropertyListings />
      </QueryProvider>
    </div>
  );
};

export default Page;
