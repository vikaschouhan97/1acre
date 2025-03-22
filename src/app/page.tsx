"use client";
import Footer from "@/contents/Footer";
import Navbar from "@/contents/Navbar";
import { useRouter } from "next/navigation";

// This component is only for redirecting user to main page 

export default function Home() {
  const router = useRouter();
  return (
    <>
    <Navbar />
    <div className="w-full h-[68vh] flex justify-center items-center">
      <button
        onClick={() => router.push("/home")}
        className="text-lg bg-yellow-300 hover:bg-yellow-400 p-2 rounded-lg cursor-pointer"
      >
        {" "}
        Click here to view Lands{" "}
      </button>
    </div>
    <Footer />
    </>
  );
}
