"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  SeeAll,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import useRecommended from "@/hooks/useRecommended";
import ShoppingCard from "./icons/ShoppingCard";
import { Button } from "./ui/button";
import EmptyImage from "./icons/EmptyImage";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      let currencyData = JSON.parse(currency);
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

  return (
    <section className="w-full flex flex-col items-start gap-8 pl-10">
      <div className="w-full flex justify-between">
        {!loading && (
          <Carousel className="w-full ">
            <div className="mb-8 flex justify-between items-center pr-10">
              <h2>Recommendations</h2>
              <SeeAll variant="seeAll" />
            </div>
            <CarouselContent className="flex gap-8">
              {recommendedProducts?.map((recProd, index) => (
                <CarouselItem key={index}>
                  <div
                    onClick={() => handleProductDetails(recProd?.id)}
                    className="p-1"
                  >
                    <Card className=" w-[300px] h-[386px] border border-special pt-4 px-4 pb-5 cursor-pointer">
                      <CardContent className=" relative flex flex-col items-start h-full w-full gap-4.5">
                        <div
                          className={cn(
                            {
                              "bg-icons":
                                !recProd.images || recProd.images.length === 0,
                              "bg-white-content":
                                Array.isArray(recProd.images) &&
                                recProd.images.length > 0,
                            },
                            "flex justify-center items-center w-full h-[204px] rounded-md"
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
                            className="absolute top-2 left-2"
                          >
                            <ShoppingCard className="text-icons w-6 h-6" />
                          </Button>
                        </div>
                        <div className="py-1.5 px-2.5 bg-first-content inline-block text-cards rounded-md">
                          {recProd.category?.name}
                        </div>
                        <CardTitle className="text-lg text-icons">
                          {recProd.name}
                        </CardTitle>
                        <CardFooter className="p-0 text-[28px] font-semibold text-icons">{`${
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
        )}
      </div>
    </section>
  );
};

export default RecommendationsList;
