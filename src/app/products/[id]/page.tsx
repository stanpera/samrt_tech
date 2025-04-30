"use client";

import EmptyImage from "@/components/icons/EmptyImage";
import ShoppingCard from "@/components/icons/ShoppingCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import useSingleProduct from "@/hooks/useSingleProduct";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CheckColor from "@/components/productDetails/CheckColor";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const ProductDetails = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const productId: string = parts[parts.length - 1];

  const { product, loading, error, errorMessage } = useSingleProduct(productId);

  const [mainImage, setMainImage] = useState<string>("none");
  const [viewMore, setViewMore] = useState(false);

  if (loading) {
    <div>loading</div>;
  }

  useEffect(() => {
    if (!loading) {
      setMainImage(product?.images ? product?.images[0]?.url : "none");
    }
  }, [loading]);

  const handleImages = (imgUrl: string) => {
    setMainImage(imgUrl);
  };

  const handleViewMore = () => {
    setViewMore((prev) => !prev);
  };

  return (
    <main
      className="flex flex-col
  "
    >
      <div className="self-start px-10 py-2.5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products-manu">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-8 p-10 items-start">
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
                    className={"w-full h-full flex justify-center"}
                    style={{
                      backgroundImage: mainImage
                        ? `url("${mainImage}")`
                        : "none",
                      backgroundSize: "70%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {error && (
                      <EmptyImage className="size-30 text-special self-center " />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="flex gap-4">
              {loading &&
                Array.from({ length: 3 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="w-[130px] h-[99px]"
                  ></Skeleton>
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
                        className={cn(
                          "w-full h-full rounded-md cursor-pointer",
                          {
                            "bg-icons": !img.url,
                            "bg-white-content": img.url,
                            "border-2 border-highlights": img.url === mainImage,
                            "opacity-50": img.url !== mainImage,
                          }
                        )}
                      >
                        <div
                          className={"w-full h-full"}
                          style={{
                            backgroundImage: img.url
                              ? `url("${img.url}")`
                              : "none",
                            backgroundSize: "70%",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                        {error && !img.url && (
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
                {`\u20AC${product?.price?.toFixed(2)}`}
              </CardTitle>
              <CardDescription>
                <div
                  className={cn("text-icons text-base font-normal", {
                    "clamp-text overflow-hidden max-h-[calc(1em*1.5*4)]":
                      !viewMore,
                  })}
                >
                  {product?.description}
                </div>
                {viewMore && (
                  <div
                    className={cn("text-icons text-base font-semibold mt-3")}
                  >
                    {product?.technicalSpecs}
                  </div>
                )}
                <CardAction
                  className="mt-1 hover:text-highlights"
                  onClick={handleViewMore}
                >
                  View More
                </CardAction>
              </CardDescription>
              <CardFooter className="flex flex-col gap-3.5 items-start">
                <div className="text-lg font-medium text-icons">
                  Shipping Available
                </div>
                <div className="flex border border-first-content p-4 gap-2 rounded-md">
                  <ShoppingCard className="w-6 h-6" />
                  <div className="text-icons flex flex-col gap-1">
                    <p className="font-medium">Smart Tech Courier</p>
                    <DeliveryDate />
                  </div>
                </div>
              </CardFooter>
            </CardContent>
          </Card>
        </Card>
        <CheckColor
          stocks={product?.stocks || undefined}
          price={product?.price || 0}
        />
      </div>
    </main>
  );
};

export default ProductDetails;
