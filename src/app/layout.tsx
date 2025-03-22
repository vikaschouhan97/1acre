import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/contents/Navbar";
import Footer from "@/contents/Footer";

const poppinsfont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

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
    <html lang="en">
      <body
        className={poppinsfont.variable}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
