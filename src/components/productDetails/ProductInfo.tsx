import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import DeliveryDate from "@/components/ui/DeliveryDate";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Quality from "@/components/icons/Quality";
import { Product } from "@/types";
import { FC } from "react";
import { useEffect, useState } from "react";
import EmptyImage from "../icons/EmptyImage";

interface ConvertionProps {
  rate: number;
  symbol: string;
}

interface ProductInfoProps {
  product: Product | undefined;
  loading: boolean;
  convertion: ConvertionProps;
}

const ProductInfo: FC<ProductInfoProps> = ({
  product,
  loading,
  convertion,
}) => {
  const [mainImage, setMainImage] = useState<string>("none");
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    if (!loading) {
      setMainImage(product?.images ? product?.images[0]?.url : "none");
    }
  }, [loading, product?.images]);

  const handleImages = (imgUrl: string) => {
    setMainImage(imgUrl);
  };

  const handleViewMore = () => {
    setViewMore((prev) => !prev);
  };

  return (
    <Card className="flex-row bg-transparent gap-12 rounded-none border-b border-special pb-12">
      <div className="flex flex-col gap-8">
        {loading && <Skeleton className="w-[422px] h-[341px]" />}
        {!loading && (
          <Card
            className={cn(
              "w-[422px] h-[341px] p-3 bg-cards border border-special"
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
                  <EmptyImage className="size-30 text-special self-center " />
                )}
              </div>
            </CardContent>
          </Card>
        )}
        <div className="flex gap-4">
          {loading &&
            Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="w-[130px] h-[99px]"></Skeleton>
            ))}
          {!loading &&
            product?.images?.map((img) => (
              <>
                <Card
                  key={product.id}
                  className={cn("w-[130px] h-[99px]")}
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
                      <EmptyImage className="size-30 text-special" />
                    )}
                  </CardContent>
                </Card>
              </>
            ))}
        </div>
      </div>
      <Card className="bg-transparent justify-start items-start w-[427]">
        <CardContent className="flex flex-col gap-8 ">
          <CardTitle className="flex flex-col text-[28px] text-icons font-medium gap-5">
            <div className="leading-tight">{product?.name}</div>
            <div className="text-sm py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start ">
              {product?.category?.name}
            </div>
          </CardTitle>
          <CardTitle className={cn("text-icons text-[32px] font-medium")}>
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
                <ul className="list-disc ">
                  {product?.technicalSpecs.split(",").map((point, index) => (
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
