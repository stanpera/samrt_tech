"use client"

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
      <section className="w-full flex flex-col items-start gap-8 px-10">
        <h2>Categories</h2>
        <div className="w-full flex justify-between">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className=" w-[220px] h-[190px]"></Skeleton>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex flex-col items-start gap-8 px-10">
        <h2>Categories</h2>
        <div className="w-full flex justify-between">
          {Array.from({ length: 5 }, (_, index) => (
            <Card
              key={index}
              className="justify-center items-center w-[220px] h-[190px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-6"
            >
              <SadError className="size-12 text-special" />
              <CardTitle className="text-center text-xl text-special ">
                {errorMessage}
              </CardTitle>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-start gap-8 px-10">
      {!loading && (
        <>
          <h2>Categories</h2>
          <div className="w-full flex justify-between">
            {categories?.map((category) => (
              <Card
                onClick={() => handleExploreCategory(category.id)}
                key={category.id}
                className="justify-center items-center w-[220px] h-[190px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-6"
              >
                <CategoryIcons variant={category.name} />
                <CardTitle className="text-center text-xl ">
                  {category?.name}
                </CardTitle>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CategoryList;
