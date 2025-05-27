"use client";

import CheckoutAddressCard from "@/components/checkout/CheckoutAddressCard";
import CheckoutProductCard from "@/components/checkout/CheckoutProductCard";
import CheckoutTotalPriceCard from "@/components/checkout/CheckoutTotalPriceCard";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

const Checkout = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center pb-20 w-full max-w-[1440px]">
      <div className="self-start px-10 py-2.5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col sm:flex-row gap-12 mt-10 max-w-[1360px] sm:w-[1360px] items-center mx-5 sm:mx-0">
        <div className="flex flex-col gap-10">
          <CheckoutProductCard setRefresh={setRefresh} />
          <CheckoutAddressCard setRefresh={setRefresh} />
          <ShippingMethod setRefresh={setRefresh} />
          <PaymentMethod setRefresh={setRefresh} />
        </div>
        <CheckoutTotalPriceCard refresh={refresh} />
      </div>
    </main>
  );
};

export default Checkout;
