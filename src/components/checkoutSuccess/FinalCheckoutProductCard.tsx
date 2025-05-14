"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Product } from "@/types";
import SadError from "../icons/sadError";

interface FinalCheckoutProductCardProps {
  products: Product[] | null;
  currency: CurrentCurrencyProps;
  totalAmount: number | null;
}

interface CurrentCurrencyProps {
  EUR: number;
  GBP: number;
  USD: number;
  currentCurrency: string;
}

const FinalCheckoutProductCard = ({
  products,
  currency,
  totalAmount,
}: FinalCheckoutProductCardProps) => {
  if (products === null) {
    return (
      <Card className="flex items-center justify-center gap-2 w-[592px] h-[138px] border border-special p-4">
        <SadError className="w-6 h-6" />
        <p>An error occurred. No product visualization available.</p>
      </Card>
    );
  }

  return (
    <>
      {products &&
        products?.map((item) => (
          <Card
            key={item.name}
            className="flex w-[592px] h-auto border border-special p-4"
          >
            <CardContent className="relative flex gap-8">
              <div className="w-[172px] p-3 h-[138px] border-1 border-special rounded-md">
                <div
                  className={cn(
                    {
                      "bg-white-content": item?.images?.[0]?.url,
                      "bg-special": !item?.images?.[0]?.url,
                    },
                    "flex justify-center items-center w-full h-full rounded-md"
                  )}
                  style={{
                    backgroundImage: item.images
                      ? `url("${item?.images?.[0]?.url}")`
                      : "none",
                    backgroundSize: "80%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
              <div className="flex flex-col flex-1 gap-4">
                <CardTitle className="text-[20px] font-medium text-icons flex justify-between">
                  {item?.name}
                </CardTitle>
                <div className="py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start text-sm">
                  {item?.category?.name}
                </div>
                <CardFooter className="flex justify-between p-0 text-2xl font-medium text-icons">
                  <div>
                    {currency.currentCurrency === "EUR"
                      ? `\u20AC${(currency.EUR * item?.price).toFixed(2)}`
                      : currency.currentCurrency === "GBP"
                      ? `\u00A3${(currency.GBP * item?.price).toFixed(2)}`
                      : `\u0024${(currency.USD * item?.price).toFixed(2)}`}
                  </div>
                  <p className="flex items-center gap-6 text-lg">
                    x{totalAmount ? totalAmount : ""}
                  </p>
                </CardFooter>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default FinalCheckoutProductCard;
