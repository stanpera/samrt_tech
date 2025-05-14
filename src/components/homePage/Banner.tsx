"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import FullArrowRight from "../icons/FullArrowRight";
import { Category } from "@/types";
import useCategories from "@/hooks/useCategories";
import SadError from "../icons/sadError";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const Banner = () => {
  const { categories, loading, error, errorMessage } = useCategories();
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const router = useRouter();

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;

    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index: number) => {
    if (!carouselAPI) return;

    carouselAPI.scrollTo(index);
  };

  useEffect(() => {
    if (!carouselAPI) return;

    onSelect();

    setScrollSnaps(carouselAPI.scrollSnapList());

    carouselAPI.on("select", onSelect);
  }, [carouselAPI, onSelect]);

  if (error) {
    return (
      <section className="w-full flex flex-col gap-6 px-0 sm:px-10">
        <Card className="bg-cover items-center justify-center h-[150px] sm:h-[170px] md:h-[252px] lg:h-[352px] xl:max-h-[452px] px-3 sm:px-30 py-2 sm:py-20 gap-1 sm:gap-6">
          <SadError className="size-8 sm:size-12 text-special" />
          <div className="text-lg sm:text-xl text-special">{errorMessage}</div>
        </Card>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="w-full flex flex-col gap-6 px-0 sm:px-10">
        <Skeleton className="bg-cover bg-[position:left] h-[150px] sm:h-[170px] md:h-[252px] lg:h-[352px] xl:h-[452px] px-3 sm:px-30 py-2 sm:py-20 gap-1 sm:gap-6" />
      </section>
    );
  }

  const handleExploreCategory = (id: number) => {
    router.push(`/products-menu?category=${String(id)}`);
  };

  return (
    <section className="w-full flex flex-col gap-2 sm:gap-6 px-0 sm:px-10">
      <>
        <Carousel
          className="w-full bg-background border-y-1 sm:border border-special sm:rounded-md overflow-hidden"
          plugins={[Autoplay({ delay: 6000 })]}
          opts={{ loop: true, align: "center" }}
          setApi={setCarouselAPI}
        >
          <CarouselContent className="h-[200px] sm:h-[300px] lg:h-[452px]">
            {categories?.map((category: Category, index) => (
              <CarouselItem
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full "
              >
                <div>
                  <Card className="relative bg-gradient-to-r from-background to-cards px-3 sm:px-15 lg:px-20 xl:px-30 py-2 sm:py-5 lg:py-10 xl:py-20 gap-1 sm:gap-6">
                    <div className="absolute w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] md:w-[300px] md:h-[300px] lg:w-[452px] lg:h-[452px] top-1/2 -translate-y-1/2 right-3 sm:top-0 sm:-translate-y-0 md:right-10 lg:right-15">
                      <Image
                        src={category.image || ""}
                        alt={category.name || "category name"}
                        width={452}
                        height={452}
                        className="w-full h-full object-contain"
                        priority={true}
                        sizes="(max-width: 640px) 180px, (max-width: 768px) 300px, 452px"
                      />
                    </div>
                    <CardContent className="h-[200px] sm:h-[300px] lg:h-[452px] flex flex-coljustify-center z-1000">
                      <div className="h-[200px] sm:h-[300px] lg:h-[452px] flex flex-col gap-2 sm:gap-4 lg:gap-10 justify-around sm:justify-start pb-5 sm:pb-0">
                        <div className="flex flex-col items-start gap-2 lg:gap-6 pl-5 sm:pl-0">
                          <CardHeader className="text-xl sm:text-[32px] text-icons">
                            {category.name}
                          </CardHeader>
                          <CardDescription className="block text-icons sm:text-base w-[150px] sm:w-auto">
                            {category.description}
                          </CardDescription>
                          <CardDescription className="text-icons hidden sm:block sm:text-base w-[200px] md:w-[300px] lg:w-[452px]">
                            {category.exploreInfo}
                          </CardDescription>
                        </div>
                        <div className="pl-5 sm:pl-0">
                          <Button
                            variant="outline"
                            size="outline"
                            className="flex items-center gap-1 sm:gap-3.5"
                            onClick={() => handleExploreCategory(category.id)}
                          >
                            Explore Category
                            <FullArrowRight />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex justify-center gap-x-4">
          {scrollSnaps.map((_, index) => (
            <Button
              variant="dot"
              size="dot"
              key={index}
              onClick={() => scrollTo(index)}
              className={`bg-special ${
                selectedIndex === index && "bg-highlights"
              }`}
            />
          ))}
        </div>
      </>
    </section>
  );
};

export default Banner;
