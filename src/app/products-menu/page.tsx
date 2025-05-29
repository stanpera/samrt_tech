"use server";

import AiAdvisor from "@/components/products-menu/AIAdvisor";
import ProductList from "@/components/products-menu/ProductsList";
import SideFilter from "@/components/products-menu/SideFilter";
import { ProductsProvider } from "@/context/ProductProvider";

const ProductMenu = () => {
  return (
    <ProductsProvider>
      <main className="w-full flex flex-col flex-1 items-center ">
        <AiAdvisor />
        <div className="hidden lg:block h-1 w-full border-b-1 border-special"></div>
        <div className="flex flex-col flex-1 items-center pb-5 w-full max-w-[1440px]">
          <div className="flex flex-col lg:flex-row w-full items-center lg:items-start justify-center ">
            <SideFilter />
            <ProductList />
          </div>
        </div>
      </main>
    </ProductsProvider>
  );
};

export default ProductMenu;
