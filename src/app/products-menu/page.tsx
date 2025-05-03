"use client";

import ProductList from "@/components/ProductsList";
import SideFilter from "@/components/SideFilter";

const ProductMenu = () => {
  return (
    <main className="flex flex-col flex-1 items-center pb-5">
      <div className="h-10 w-full border-b-1 border-special"></div>
      <div className="flex w-full items-start ">
        <SideFilter />
        <ProductList />
      </div>
    </main>
  );
};

export default ProductMenu;
