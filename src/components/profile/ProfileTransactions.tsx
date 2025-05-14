"use client";

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import Bag from "../icons/Bag";
import useOrders from "@/hooks/useOrders";
import SadError from "../icons/sadError";
import { Skeleton } from "../ui/skeleton";

const ProfileTransactions = () => {
  const { orders, error, errorMessage, loading } =
    useOrders("?ordersData=orders");
  console.log("orders", orders);

  if (loading) {
    return <Skeleton className="w-full gap-4 p-4 " />;
  }

  if (error) {
    return (
      <Card className="w-full flex flex-col items-center justify-center gap-4 p-4 border border-special text-icons">
        <SadError className="w-12 h-12" />
        <p>{errorMessage}</p>
      </Card>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <div className="w-[50%] mb-8">
        <h3 className="text-lg font-semibold mb-3 text-center">Transactions</h3>
        <Separator className="border-2" />
      </div>
      <div className="flex flex-col gap-4">
        {orders?.map((item) => (
          <Card
            key={item.id}
            className="flex flex-row gap-4 p-4 border border-special text-icons"
          >
            <Bag />
            <div className="flex flex-col gap-3.5">
              <CardDescription className="text-base">
                {new Date(item?.createdAt).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </CardDescription>
              <CardContent className="text-lg font-medium">
                <CardTitle>Your order {item?.orderNumber} </CardTitle>
                <CardTitle>
                  <ul>
                    {item?.orderItems?.map((p) => (
                      <li key={p.id}>&bull; {p.product?.name}</li>
                    ))}
                  </ul>
                </CardTitle>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileTransactions;
