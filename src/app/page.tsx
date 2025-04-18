"use client";
import Banner from "@/components/Banner";
import Brands from "@/components/Brands";
import CategoryList from "@/components/CategoryList";
import RecommendationsList from "@/components/RecommendationsList";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center pb-20 gap-25">
      <Banner />
      <CategoryList />
      <RecommendationsList />
      <Brands />
    </main>
  );
}
