"use client";

import PaymentCheckout from "@/components/checkout/PaymentChackout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import useOrderData from "@/hooks/useOrderData";
import { useEffect, useState } from "react";
import SadError from "@/components/icons/sadError";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Pay = () => {
  const publishKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const stripePromise = loadStripe(publishKey ? publishKey : "");

  const { order, error, loading } = useOrderData();
  const [totalPriceToPay, setTotalPriceToPay] = useState<number>(10000000);

  useEffect(() => {
    const totalProdPrice = order?.orderItems
      ?.map((item) => item.quantity * item.priceAtPurchase)
      ?.reduce((acc, val) => acc + val);

    const totalProdProtect = order?.orderItems
      ?.map((item) => item.quantity * item.productProtection)
      ?.reduce((acc, val) => acc + val);

    const serviceFees = order?.serviceFees || 0;
    const shippingInsurance = order?.shippingInsurance || 0;
    const shippingPrice = order?.shippingPrice || 0;

    if (totalProdPrice && totalProdProtect) {
      const totalPrice =
        totalProdPrice +
        totalProdProtect +
        serviceFees +
        shippingInsurance +
        shippingPrice;

      setTotalPriceToPay(totalPrice);
    }
  }, [order]);

  if (loading) {
    return (
      <main className="flex flex-col items-center mt-10 mb-20 w-full max-w-[1440px] h-auto">
        <Skeleton className=" w-full sm:w-[592px] h-[250px] sm:h-[500px]" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center mt-10 mb-20 w-full max-w-[1440px] h-auto">
        <Card className="w-full sm:w-[592px] h-[250px] sm:h-[500px] items-center justify-center text-icons gap-2">
          <SadError className="w-10 h-10" />
          <p>{error}</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center mt-10 mb-20 w-full max-w-[1440px] h-auto">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(totalPriceToPay),
          currency: "usd",
        }}
      >
        <PaymentCheckout amount={totalPriceToPay} />
      </Elements>
    </main>
  );
};

export default Pay;
