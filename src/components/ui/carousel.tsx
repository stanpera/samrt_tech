"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FullArrowRight from "../icons/FullArrowRight";
import FullArrowLeft from "../icons/FullArrowLeft";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative overflow-hidden", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} data-slot="carousel-content">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-0" : "-mt-0 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(className, orientation === "horizontal" ? "pl-0" : "pt-0")}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "banner",
  size = "banner",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute rounded-none rounded-r-md flex justify-center items-center",
        orientation === "horizontal"
          ? "top-1/2 -left-0 -translate-y-1/2"
          : "-top-0 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="text-background" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "banner",
  size = "banner",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute rounded-none rounded-l-md flex justify-center items-center",
        orientation === "horizontal"
          ? "top-1/2 -right-0 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="text-background" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function SeeAll({
  className,
  variant = "seeAll",
  size = "seeAll",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { api, canScrollNext } = useCarousel();

  const scrollToEnd = () => {
    if (api) {
      api.scrollTo(api.scrollSnapList().length - 1);
    }
  };
  const scrollToStart = () => {
    if (api) {
      api.scrollTo(api.scrollSnapList().length - api.scrollSnapList().length);
    }
  };
  return (
    <>
      {canScrollNext && (
        <Button
          variant={variant}
          size={size}
          className={cn(
            `flex gap-2 sm:gap-3.5 justify-end items-end pr-2 sm:pr-0 sm:items-center self-end sm:self-center`,
            className
          )}
          onClick={scrollToEnd}
          {...props}
        >
          <span className="text-xs sm:text-base">See All</span>
          <FullArrowRight className="text-highlights " />
        </Button>
      )}
      {!canScrollNext && (
        <Button
          variant={variant}
          size={size}
          className={cn(
            `flex sm:gap-3.5 gap-2 justify-end items-end sm:items-center pr-2 sm:pr-0 self-end sm:self-center`,
            className
          )}
          onClick={scrollToStart}
          {...props}
        >
          <FullArrowLeft className="text-highlights " />
          <span className="text-xs sm:text-base">Back</span>
        </Button>
      )}
    </>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  SeeAll,
};
