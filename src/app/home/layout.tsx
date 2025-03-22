import Footer from "@/contents/Footer";
import Navbar from "@/contents/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1acre",
  description: "Buy and sell lands easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
