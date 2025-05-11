"use client";

import Quality from "../icons/Quality";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

type Shipping = "smartTechCourier" | "smartParcelLocker";

interface ShippingMethodProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({ setRefresh }) => {
  const [shippingMethod, setShippingMethod] =
    useState<Shipping>("smartTechCourier");

  useEffect(() => {
    localStorage.setItem("shipping", "smartTechCourier");
  }, []);

  const handlePaymentMethod = (method: Shipping) => {
    if (method !== "smartParcelLocker") {
      setShippingMethod(method);
      localStorage.setItem("shipping", method);
      setRefresh((prev) => !prev);
    }
  };

  return (
    <section>
      <h3 className="text-2xl font-medium mb-4">Shipping</h3>
      <Card className="flex flex-row h-auto border border-special text-icons">
        <div
          className={cn(
            "flex gap-3 items-center py-6 pl-6 pr-4 cursor-pointer hover:bg-highlights hover:text-cards",
            {
              "bg-highlights text-cards": shippingMethod === "smartTechCourier",
            }
          )}
          onClick={() => handlePaymentMethod("smartTechCourier")}
        >
          <Quality className="w-6 h-6" />
          <CardTitle className="text-lg font-medium">
            Smart Tech Courier
          </CardTitle>
        </div>
        <Separator orientation="vertical" />
        <div
          className={cn(
            "relative flex gap-3 items-center py-6 pl-6 pr-4 opacity-40"
          )}
          onClick={() => handlePaymentMethod("smartParcelLocker")}
        >
          <Quality className="w-6 h-6" />
          <CardTitle className="text-lg font-medium">
            Smart Tech Parcel Locker
          </CardTitle>
          <p className="absolute text-xs bottom-1 left-1/2 -translate-x-1/2">
            Comming soon.
          </p>
        </div>
      </Card>
    </section>
  );
};

export default ShippingMethod;
