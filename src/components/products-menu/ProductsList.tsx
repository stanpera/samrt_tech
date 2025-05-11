"use client";

import SortProducts from "../SortProducts";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import EmptyImage from "../icons/EmptyImage";
import ShoppingCard from "../icons/ShoppingCard";
import { cn } from "@/lib/utils";
import CustomPagination from "./CustomPagination";
import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "../ui/tooltip";

import { useProductsContext } from "@/context/ProductProvider";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";

interface convertionProps {
  rate: number;
  symbol: "\u0024" | "\u20AC" | "\u00A3";
}

const ProductList: React.FC = () => {
  const {
    products,
    totalProducts,
    loading,
    error,
    errorMessage,
    page,
    limit,
    currentCurrency,
    setPage,
  } = useProductsContext();

  const [convertion, setConvertion] = useState<convertionProps>({
    rate: 1,
    symbol: "\u0024",
  });

  useEffect(() => {
    const currency = localStorage.getItem("currentCurrency");
    if (currency) {
      const currencyData = JSON.parse(currency);
      const rate = parseFloat(currencyData[currentCurrency]);
      const symbol =
        currentCurrency === "USD"
          ? "\u0024"
          : currentCurrency === "EUR"
          ? "\u20AC"
          : "\u00A3";
      setConvertion({ rate: rate, symbol: symbol });
    }
  }, [currentCurrency]);

  if (loading) {
    return (
      <div className="flex flex-col p-10 gap-10">
        <SortProducts />
        <div className="flex flex-wrap gap-12">
          {Array.from({ length: limit || 9 }, (_, index) => (
            <Skeleton
              key={index}
              className="w-[300px] h-[386px] border border-special gap-6"
            ></Skeleton>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col p-10 gap-10">
        <SortProducts />
        <div className="flex flex-wrap gap-12">
          {Array.from({ length: limit || 9 }, (_, index) => (
            <Card
              key={index}
              className=" justify-center items-center w-[300px] h-[386px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-6"
            >
              <EmptyImage className="size-30 text-special" />
              <CardTitle className="text-center text-xl text-special">
                {errorMessage}
              </CardTitle>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const maxPages = Math.ceil(totalProducts / limit) - 1;

  const handlePreviousPagination = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const handleNextPagination = () => {
    if (maxPages) {
      setPage(page + 1);
    }
  };

  const handlePaginationPage = (i: number) => {
    setPage(i);
  };

  return (
    <div className="flex flex-col p-10 gap-10">
      <SortProducts />
      <div className="flex flex-wrap gap-12">
        {products?.map((prod) => (
          <Card
            key={prod.id}
            className="relative w-[300px] h-[386px] border border-special pt-4 px-4 pb-5"
          >
            <Button
              variant="shop"
              size="shop"
              className="absolute top-7 left-7"
            >
              <ShoppingCard className="text-icons w-6 h-6" />
            </Button>
            <CardContent className=" flex flex-col">
              <Link href={`/products/${prod.id}`}>
                <div
                  className={cn(
                    {
                      "bg-icons": !prod.images || prod.images.length === 0,
                      "bg-white-content":
                        Array.isArray(prod.images) && prod.images.length > 0,
                    },
                    " h-[204px] rounded-md flex items-center justify-center"
                  )}
                  style={{
                    backgroundImage:
                      prod.images &&
                      prod.images.length > 0 &&
                      prod.images[0].url
                        ? `url("${prod.images[0].url}")`
                        : "none",
                    backgroundSize: "70%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {(!prod.images || prod.images.length === 0) && (
                    <EmptyImage className="size-30 text-special" />
                  )}
                </div>
              </Link>
              <div className="py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start mt-4.5">
                {prod.category?.name}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <CardTitle className="text-lg text-icons mt-4">
                    <>
                      {prod.name.length < 25 ? (
                        <div className="overflow-hidden whitespace-nowrap max-w-full text-ellipsis">
                          {prod.name}
                        </div>
                      ) : (
                        <TooltipTrigger asChild>
                          <div className="overflow-hidden whitespace-nowrap max-w-full text-ellipsis">
                            {prod.name}
                          </div>
                        </TooltipTrigger>
                      )}
                    </>
                    <TooltipContent>
                      <p className="text-sm bg-special text-icons rounded-md">
                        {prod.name}
                      </p>
                    </TooltipContent>
                  </CardTitle>
                </Tooltip>
              </TooltipProvider>
              <CardFooter className="p-0 mt-2 text-[28px] font-semibold text-icons">{`${
                convertion.symbol
              }${(prod.price * convertion.rate).toFixed(2)}`}</CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
      <CustomPagination
        maxPages={maxPages}
        page={page}
        handlePaginationPage={handlePaginationPage}
        handlePreviousPagination={handlePreviousPagination}
        handleNextPagination={handleNextPagination}
      />
    </div>
  );
};

export default ProductList;
