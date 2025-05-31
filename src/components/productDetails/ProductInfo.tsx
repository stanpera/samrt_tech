"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import DeliveryDate from "@/components/ui/DeliveryDate";
import { cn } from "@/lib/utils";
import Quality from "@/components/icons/Quality";
import { Product } from "@/types";
import { FC } from "react";
import { useEffect, useState } from "react";
import EmptyImage from "../icons/EmptyImage";

interface convertionProps {
  rate: number;
  symbol: "\u0024" | "\u20AC" | "\u00A3";
}

interface ProductInfoProps {
  product: Product | undefined;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState<string>(
    product?.images ? product.images[0]?.url ?? "" : ""
  );
  const [viewMore, setViewMore] = useState(false);
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


  const handleImages = (imgUrl: string) => {
    setMainImage(imgUrl);
  };

  const handleViewMore = () => {
    setViewMore((prev) => !prev);
  };

  return (
    <Card className="flex-col lg:flex-row  bg-transparent gap-12 rounded-none border-b border-special pb-12">
      <div className="flex flex-col gap-8">
        <Card
          className={cn(
            "w- h-[300px] sm:w-[422px] sm:h-[341px] p-3 bg-cards border border-special"
          )}
        >
          <CardContent
            className={cn("w-full h-full rounded-md", {
              "bg-icons": !mainImage || mainImage === "none",
              "bg-white-content": mainImage && mainImage !== "none",
            })}
          >
            <div
              className={"w-full h-full flex justify-center items-center"}
              style={{
                backgroundImage: mainImage ? `url("${mainImage}")` : "none",
                backgroundSize: "70%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {!mainImage && (
                <EmptyImage className="size-20 sm:size-30 text-special self-center " />
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-4">
          {product?.images?.map((img) => (
            <Card
              key={img.id}
              className={cn("w-[100px] h-[70px] sm:w-[130px] sm:h-[99px]")}
              onClick={() => handleImages(img.url)}
            >
              <CardContent
                className={cn("w-full h-full rounded-md cursor-pointer", {
                  "bg-icons": !img.url,
                  "bg-white-content": img.url,
                  "border-2 border-highlights": img.url === mainImage,
                  "opacity-50": img.url !== mainImage,
                })}
              >
                <div
                  className={"w-full h-full"}
                  style={{
                    backgroundImage: img.url ? `url("${img.url}")` : "none",
                    backgroundSize: "70%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                {!img.url && (
                  <EmptyImage className="sm:size-30 size-20 text-special" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Card className="bg-transparent justify-center sm:justify-start items-start w-full sm:w-[427]">
        <CardContent className="flex flex-col gap-8 ">
          <CardTitle className="flex flex-col text-xl sm:text-[28px] text-icons font-medium gap-5">
            <div className="leading-tight">{product?.name}</div>
            <div className="text-sm py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start ">
              {product?.category?.name}
            </div>
          </CardTitle>
          <CardTitle
            className={cn("text-icons text-xl sm:text-[32px] font-medium")}
          >
            {`${convertion?.symbol}${
              product?.price ? (product.price * convertion?.rate).toFixed(2) : 0
            }`}
          </CardTitle>
          <CardDescription className="flex flex-col items-start">
            <div
              className={cn("text-icons text-base font-normal", {
                "clamp-text overflow-hidden max-h-[calc(1em*1.5*4)]": !viewMore,
              })}
            >
              {product?.description}
            </div>
            {viewMore && (
              <div className={cn("text-icons text-base mt-5")}>
                <p className="mb-2 font-semibold">Technical specifications:</p>
                <ul className="list-disc pl-5 sm:pl-0">
                  {product?.technicalSpecs?.split(",").map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            <CardAction
              className=" mt-1 hover:text-highlights duration-300 self-start"
              onClick={handleViewMore}
            >
              {!viewMore ? "View More" : "View Less"}
            </CardAction>
          </CardDescription>
          <CardFooter className="flex flex-col gap-3.5 items-start">
            <div className="text-lg font-medium text-icons">
              Shipping Available
            </div>
            <div className="flex border border-first-content p-4 gap-2 rounded-md">
              <Quality className="w-6 h-6" />
              <div className="text-icons flex flex-col gap-1">
                <p className="font-medium">Smart Tech Courier</p>
                <DeliveryDate />
              </div>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Card>
  );
};

export default ProductInfo;
