import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/storeProvider";
import { Toaster } from "@/components/ui/sonner"

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
      <body className={poppinsfont.variable}>
        <StoreProvider>
          <Toaster position="top-right" />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
