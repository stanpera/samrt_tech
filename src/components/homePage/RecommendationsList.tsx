"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  SeeAll,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import useRecommended from "@/hooks/useRecommended";
import ShoppingCard from "../icons/ShoppingCard";
import { Button } from "../ui/button";
import EmptyImage from "../icons/EmptyImage";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import SadError from "../icons/sadError";

interface convertionProps {
  rate: number;
  symbol: "\u0024" | "\u20AC" | "\u00A3";
}

const RecommendationsList = () => {
  const { recommendedProducts, loading, error, errorMessage } =
    useRecommended();

  const router = useRouter();

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

  const handleProductDetails = (id: number) => {
    router.push(`/products/${String(id)}`);
  };

  if (loading) {
    return (
      <section className="w-full flex flex-col items-start gap-8 px-0 sm:px-10">
        <Carousel className="w-full ">
          <div className="mb-1 sm:mb-8 flex flex-col sm:flex-row justify-between items-center pr-0 sm:pr-10">
            <h2 className="text-xl sm:text-[28px]">Recommendations</h2>
            <SeeAll variant="seeAll" />
          </div>
          <CarouselContent className="flex gap-3 sm:gap-8">
            {Array.from({ length: 5 }, (_, index) => (
              <CarouselItem key={index}>
                <Skeleton className="w-[200px] h-[250px] sm:w-[300px] sm:h-[386px] pt-4 px-4 pb-5" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }
  if (error) {
    return (
      <section className="w-full flex flex-col items-start px-0 sm:px-10">
        <Carousel className="w-full ">
          <div className="mb-1 sm:mb-8 flex flex-col sm:flex-row justify-between items-center pr-0 sm:pr-10">
            <h2 className="text-xl sm:text-[28px]">Recommendations</h2>
            <SeeAll variant="seeAll" />
          </div>
          <CarouselContent className="flex gap-3 sm:gap-8">
            {Array.from({ length: 5 }, (_, index) => (
              <CarouselItem key={index}>
                <Card className="w-[200px] h-[250px] sm:w-[300px] sm:h-[386px] items-center justify-center text-icons border border-special pt-4 px-4 pb-5 cursor-pointer">
                  <SadError className="size-8 sm:size-12 text-special" />
                  <p>{errorMessage}</p>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-start px-0 sm:px-10">
      <div className="w-full flex justify-between">
        <Carousel className="w-full ">
          <div className="mb-1 sm:mb-8 flex flex-col sm:flex-row justify-between items-center pr-0 sm:pr-10">
            <h2 className="text-xl sm:text-[28px]">Recommendations</h2>
            <SeeAll variant="seeAll" />
          </div>
          <CarouselContent className="flex gap-3 sm:gap-8">
            {recommendedProducts?.map((recProd, index) => (
              <CarouselItem key={index}>
                <div
                  onClick={() => handleProductDetails(recProd?.id)}
                  className="p-1"
                >
                  <Card className="w-[200px] h-[300px] sm:w-[300px] sm:h-[386px] border border-special p-3 sm:pt-4 sm:px-4 sm:pb-5 cursor-pointer">
                    <CardContent className=" relative flex flex-col items-start justify-center sm:justify-start h-full w-full gap-3 sm:gap-4.5">
                      <div
                        className={cn(
                          {
                            "bg-icons":
                              !recProd.images || recProd.images.length === 0,
                            "bg-white-content":
                              Array.isArray(recProd.images) &&
                              recProd.images.length > 0,
                          },
                          "flex justify-center items-center w-full h-[150px] rounded-md"
                        )}
                        style={{
                          backgroundImage:
                            recProd.images &&
                            recProd.images.length > 0 &&
                            recProd.images[0].url
                              ? `url("${recProd.images[0].url}")`
                              : "none",
                          backgroundSize: "70%",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        {(!recProd.images || recProd.images.length === 0) && (
                          <EmptyImage className="size-30 text-special" />
                        )}
                        <Button
                          variant="shop"
                          size="shop"
                          className="absolute bottom-0 right-0 sm:top-2 sm:bottom-auto sm:right-auto sm:left-2"
                        >
                          <ShoppingCard className="text-cards sm:text-icons w-6 h-6" />
                        </Button>
                      </div>
                      <div className="py-1 px-1.5 sm:py-1.5 sm:px-2.5 bg-first-content inline-block text-cards rounded-md">
                        {recProd.category?.name}
                      </div>
                      <CardTitle className="text-base sm:text-lg text-icons">
                        {recProd.name}
                      </CardTitle>
                      <CardFooter className="p-0 text-xl sm:text-[28px] font-semibold text-icons">{`${
                        convertion.symbol
                      } ${(recProd.price * convertion.rate).toFixed(
                        2
                      )}`}</CardFooter>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RecommendationsList;
