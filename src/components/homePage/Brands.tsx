"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  SeeAll,
} from "@/components/ui/carousel";
import { Card, CardTitle } from "../ui/card";
import useBrands from "@/hooks/useBrands";
import SadError from "../icons/sadError";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const Brands = () => {
  const { brands, loading, error, errorMessage } = useBrands();
  const router = useRouter();

  const handleBrands = (id: number) => {
    router.push(`/products-menu?brand=${String(id)}`);
  };

  if (error || loading) {
    return (
      <section className="w-full flex flex-col items-start px-0 sm:px-10">
        <div className="w-full flex justify-between">
          <Carousel className="w-full ">
            <div className="mb-1 sm:mb-8 flex flex-col sm:flex-row justify-between items-center pr-0 sm:pr-10">
              <h2 className="text-xl sm:text-[28px]">Brands</h2>
              <SeeAll variant="seeAll" />
            </div>
            <CarouselContent className="flex gap-2 sm:gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    {loading && (
                      <Skeleton className="justify-center items-center w-[130px] h-[120px] sm:w-[220px] sm:h-[190px] hover:text-highlights hover:border-highlights hover:scale-105 gap-3 sm:gap-6" />
                    )}
                    {error && (
                      <Card className="justify-center items-center w-[130px] h-[120px] sm:w-[220px] sm:h-[190px] hover:text-highlights hover:border-highlights hover:scale-105 border border-special gap-6">
                        <SadError className="size-8 sm:size-12 text-special" />

                        <CardTitle className="text-center text-xl text-special ">
                          {error && errorMessage}
                        </CardTitle>
                      </Card>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full flex flex-col items-start px-0 sm:px-10">
      <div className="w-full flex justify-between">
        <Carousel className="w-full ">
          <div className="mb-1 sm:mb-8 flex flex-col sm:flex-row justify-between items-center pr-0 sm:pr-10">
            <h2 className="text-xl sm:text-[28px]">Brands</h2>
            <SeeAll variant="seeAll" />
          </div>
          <CarouselContent className="flex gap-2 sm:gap-8">
            {brands?.map((brand) => (
              <CarouselItem key={brand.id}>
                <div onClick={() => handleBrands(brand.id)} className="p-1 ">
                  <Card className="justify-center items-center w-[130px] h-[120px] sm:w-[220px] sm:h-[190px] text-icons hover:text-highlights hover:border-highlights border border-special gap-3 sm:gap-7 cursor-pointer hover:scale-105 duration-300">
                    {typeof brand.logoUrl === "string" && (
                      <>
                        <Image
                          className="hidden sm:block"
                          src={brand.logoUrl}
                          alt={`logo ${brand.name}`}
                          width={46}
                          height={46}
                        />
                        <Image
                          className="block sm:hidden"
                          src={brand.logoUrl}
                          alt={`logo ${brand.name}`}
                          width={26}
                          height={26}
                        />
                      </>
                    )}
                    <CardTitle className="text-center text-lg sm:text-xl">
                      {brand.name}
                    </CardTitle>
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

export default Brands;
