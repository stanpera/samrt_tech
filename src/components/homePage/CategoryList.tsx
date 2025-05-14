"use client";

import { Card, CardTitle } from "../ui/card";
import useCategories from "@/hooks/useCategories";
import CategoryIcons from "../icons/CategoryIcons";
import SadError from "../icons/sadError";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

const CategoryList = () => {
  const { categories, loading, error, errorMessage } = useCategories();
  const router = useRouter();

  const handleExploreCategory = (id: number) => {
    router.push(`/products-menu?category=${String(id)}`);
  };

  if (loading) {
    return (
      <section className="w-full flex flex-col items-center sm:items-start gap-5 sm:gap-8 px-5  sm:px-10">
        <h2 className="text-xl sm:text-[28px]">Categories</h2>
        <div className="w-full flex flex-wrap sm:flex-nowrap justify-center gap-5 sm:gap-0 sm:justify-between">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              className="w-[125px] h-[100px] sm:w-[220px] sm:h-[190px]"
            ></Skeleton>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex flex-col items-center sm:items-start gap-5 sm:gap-8 px-5  sm:px-10">
        <h2 className="text-xl sm:text-[28px]">Categories</h2>
        <div className="w-full flex flex-wrap sm:flex-nowrap justify-center gap-5 sm:gap-0 sm:justify-between">
          {Array.from({ length: 5 }, (_, index) => (
            <Card
              key={index}
              className="justify-center items-center w-[125px] h-[100px] sm:w-[220px] sm:h-[190px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-2 sm:gap-6"
            >
              <SadError className="size-6 sm:size-12 text-special" />
              <CardTitle className="text-center text-lg text-special ">
                {errorMessage}
              </CardTitle>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center sm:items-start gap-5 sm:gap-8 px-5 sm:px-10">
      <>
        <h2 className="text-xl sm:text-[28px]">Categories</h2>
        <div className="w-full flex flex-wrap sm:flex-nowrap justify-center gap-3  sm:gap-0 sm:justify-between">
          {categories?.map((category) => (
            <Card
              onClick={() => handleExploreCategory(category.id)}
              key={category.id}
              className="justify-center items-center w-[125px] h-[100px] sm:w-[220px] sm:h-[190px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-2 sm:gap-6"
            >
              <CategoryIcons
                className="w-8 h-8 sm:w-20 sm:h-20"
                variant={category.name}
              />
              <CardTitle className="text-center text-base sm:text-xl ">
                {category?.name}
              </CardTitle>
            </Card>
          ))}
        </div>
      </>
    </section>
  );
};

export default CategoryList;
