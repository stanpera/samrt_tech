import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SnackbarProvider } from "@/context/SnackbarContext";
import CustomNotification from "@/components/ui/CustomNotification";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Tech",
  description: "Computer and electronic equipment store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`max-w-[1440px] w-full gap-2 `}>
        <SnackbarProvider>
          <Header />
          <CustomNotification />
          {children}
          <Footer />
        </SnackbarProvider>
      </body>
    </html>
  );
}
