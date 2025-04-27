import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SnackbarProvider } from "@/context/SnackbarContext";
import CustomNotification from "@/components/ui/CustomNotification";
import { ProductsProvider } from "@/context/ProductProvider";

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
      <body>
        <SnackbarProvider>
          <ProductsProvider>
            <Header />
            <CustomNotification />
            {children}
            <Footer />
          </ProductsProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
