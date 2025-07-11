"use client";

import CartProduct from "@/components/cart/CartProduct";
import TotalProduct from "@/components/cart/TotalProduct";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

const Cart = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <main
      className="flex flex-col items-center pb-20 w-full max-w-[1440px] h-auto
    "
    >
      <div className="self-center sm:self-start px-5 sm:px-10 py-2.5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mt-5 lg:mt-10 w-full px-5 lg:px-10 h-full">
        <CartProduct setRefresh={setRefresh} />
        <TotalProduct refresh={refresh} />
      </div>
    </main>
  );
};

export default Cart;
