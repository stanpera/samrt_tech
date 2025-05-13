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
    <section className="w-full flex flex-col gap-6 px-10">
      <Card className="bg-cards flex flex-col items-center justify-center h-[452px] px-30 py-20 gap-6 border border-special">
        <SadError className="size-12 text-special" />
        <div className="text-xl text-special">{errorMessage}</div>
      </Card>
    </section>;
  }

  if (loading) {
    return (
      <section className="w-full flex flex-col gap-6 px-10">
        <Skeleton className="h-[452px] px-30 py-20 gap-6" />
      </section>
    );
  }

  const handleExploreCategory = (id: number) => {
    router.push(`/products-menu?category=${String(id)}`);
  };

  return (
    <section className="w-full flex flex-col gap-6 px-10">
      <>
        <Carousel
          className="bg-background border border-special rounded-md overflow-hidden"
          plugins={[Autoplay({ delay: 6000 })]}
          opts={{ loop: true, align: "center" }}
          setApi={setCarouselAPI}
        >
          <CarouselContent className=" max-h-[452px]">
            {categories?.map((category: Category, index) => (
              <CarouselItem
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full "
              >
                <div>
                  <Card
                    style={{ backgroundImage: `url("${category.image}")` }}
                    className="bg-cover bg-[position:left] max-h-[452px] px-30 py-20 gap-6"
                  >
                    <CardContent className="h-[452px] flex flex-col justify-center">
                      <div className="w-[433px] flex flex-col gap-10">
                        <div className="flex flex-col items-start gap-6">
                          <CardHeader className="text-[32px] text-icons">
                            {category.name}
                          </CardHeader>
                          <CardDescription className="text-icons">
                            {category.description}
                          </CardDescription>
                          <CardDescription className="text-icons">
                            {category.exploreInfo}
                          </CardDescription>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            size="outline"
                            className="flex gap-3.5"
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
