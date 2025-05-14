"use client";

import ProductList from "@/components/products-menu/ProductsList";
import SideFilter from "@/components/products-menu/SideFilter";
import { ProductsProvider } from "@/context/ProductProvider";
import { Suspense } from "react";

const ProductMenu = () => {
  return (
    <ProductsProvider>
      <main className="w-full flex flex-col flex-1 items-center">
        <div className="h-10 w-full border-b-1 border-special"></div>
        <div className="flex flex-col flex-1 items-center pb-5 w-full max-w-[1440px]">
          <div className="flex w-full items-start ">
            <Suspense fallback={null}>
              <SideFilter />
            </Suspense>
            <ProductList />
          </div>
        </div>
      </main>
    </ProductsProvider>
  );
};

export default ProductMenu;
