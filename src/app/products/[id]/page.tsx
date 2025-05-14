"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import useSingleProduct from "@/hooks/useSingleProduct";
import { usePathname } from "next/navigation";

import AddToCart from "@/components/productDetails/AddToCart";
import ProductInfo from "@/components/productDetails/ProductInfo";
import { useEffect, useState } from "react";

interface convertionProps {
  rate: number;
  symbol: "\u0024" | "\u20AC" | "\u00A3";
}

const ProductDetails = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const productId: string = parts[parts.length - 1];

  const { product, loading, error, errorMessage } = useSingleProduct(productId);

  const [convertion, setConvertion] = useState<convertionProps>({
    rate: 1,
    symbol: "\u0024",
  });

  useEffect(() => {
    const currency = localStorage.getItem("currentCurrency");
    if (currency) {
      const currencyData = JSON.parse(currency);
      const currentCurrency = currencyData.currentCurrency;
      const rate = parseFloat(currencyData[currentCurrency]);

      const symbol =
        currentCurrency === "USD"
          ? "\u0024"
          : currentCurrency === "EUR"
          ? "\u20AC"
          : "\u00A3";

      setConvertion({ rate: rate, symbol: symbol });
    }
  }, []);

  if (error) {
    return (
      <main
        className="flex flex-1 items-center justify-center
  "
      >
        <div>{errorMessage}</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full max-w-[1440px]">
      <div className="self-start px-10 py-2.5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products-menu">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-8 p-10 items-start">
        <ProductInfo
          product={product}
          convertion={convertion}
          loading={loading}
        />
        <AddToCart product={product} convertion={convertion} />
      </div>
    </main>
  );
};

export default ProductDetails;
