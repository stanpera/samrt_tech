import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { SnackbarProvider } from "@/context/SnackbarContext";
import CustomNotification from "@/components/ui/CustomNotification";
import Providers from "@/providers/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <body className="flex flex-col items-center">
        <Providers>
          <SnackbarProvider>
            <Header />
            <CustomNotification />
            {children}
            <Footer />
          </SnackbarProvider>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
