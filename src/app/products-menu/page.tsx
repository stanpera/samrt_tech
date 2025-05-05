"use client";

import ProductList from "@/components/products-menu/ProductsList";
import SideFilter from "@/components/products-menu/SideFilter";
import { ProductsProvider } from "@/context/ProductProvider";

const ProductMenu = () => {
  return (
    <ProductsProvider>
      <main className="flex flex-col flex-1 items-center pb-5">
        <div className="h-10 w-full border-b-1 border-special"></div>
        <div className="flex w-full items-start ">
          <SideFilter />
          <ProductList />
        </div>
      </main>
    </ProductsProvider>
  );
};

export default ProductMenu;
