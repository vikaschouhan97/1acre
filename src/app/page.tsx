"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-[68vh] flex justify-center items-center">
      <button
        onClick={() => router.push("/home")}
        className="text-lg bg-yellow-300 hover:bg-yellow-400 p-2 rounded-lg cursor-pointer"
      >
        {" "}
        Click here to view Lands{" "}
      </button>
    </div>
  );
}
