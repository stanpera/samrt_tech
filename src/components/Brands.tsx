"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  SeeAll,
} from "@/components/ui/carousel";
import { Card, CardTitle } from "./ui/card";
import useBrands from "@/hooks/useBrands";
import LoadingSpinner from "./ui/LoadingSpinner";
import SadError from "./icons/sadError";

const Brands = () => {
  const { brands, loading, error, errorMessage } = useBrands();

  if (error || loading) {
    return (
      <section className="w-full flex flex-col items-start gap-8 pl-10">
        <div className="w-full flex justify-between">
          <Carousel className="w-full ">
            <div className="mb-8 flex justify-between items-center pr-10">
              <h2>Brands</h2>
              <SeeAll variant="seeAll" />
            </div>
            <CarouselContent className="flex gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="justify-center items-center w-[220px] h-[190px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-6">
                      {(error && (
                        <SadError className="size-12 text-special" />
                      )) ||
                        (loading && <LoadingSpinner />)}
                      <CardTitle className="text-center text-xl text-special ">
                        {error && errorMessage}
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
  }

  return (
    <section className="w-full flex flex-col items-start gap-8 pl-10">
      <div className="w-full flex justify-between">
        <Carousel className="w-full ">
          <div className="mb-8 flex justify-between items-center pr-10">
            <h2>Brands</h2>
            <SeeAll variant="seeAll" />
          </div>
          <CarouselContent className="flex gap-8">
            {brands?.map((brand) => (
              <CarouselItem key={brand.id}>
                <div className="p-1">
                  <Card className="justify-center items-center w-[220px] h-[190px] text-icons hover:text-highlights hover:border-highlights border border-special gap-7">
                    {typeof brand.logoUrl === "string" && (
                      <img
                        className="h-11.5"
                        src={brand.logoUrl}
                        alt={`logo ${brand.name}`}
                      ></img>
                    )}
                    <CardTitle className="text-center text-xl">
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
