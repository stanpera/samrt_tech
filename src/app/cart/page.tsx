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
      className="flex flex-col flex-1 items-center pb-20
    "
    >
      <div className="self-start px-10 py-2.5">
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
      <div className="flex items-start gap-12 mt-10">
        <CartProduct setRefresh={setRefresh} />
        <TotalProduct refresh={refresh} />
      </div>
    </main>
  );
};

export default Cart;
