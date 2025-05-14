import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { SnackbarProvider } from "@/context/SnackbarContext";
import CustomNotification from "@/components/ui/CustomNotification";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AuthProvider from "@/context/AuthProviders";

export const metadata: Metadata = {
  title: "Smart Tech",
  description: "Computer and electronic equipment store.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center">
        <AuthProvider>
          <SnackbarProvider>
            <Header />
            <CustomNotification />
            {children}
            <Footer />
          </SnackbarProvider>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
