"use client";

import Brands from "@/components/homePage/Brands";
import CategoryList from "@/components/homePage/CategoryList";
import RecommendationsList from "@/components/homePage/RecommendationsList";
import Banner from "@/components/homePage/Banner";

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-[1440px] items-center justify-center pb-10 sm:pb-20 gap-10 sm:gap-25 flex-1">
      <Banner />
      <CategoryList />
      <RecommendationsList />
      <Brands />
    </main>
  );
}
