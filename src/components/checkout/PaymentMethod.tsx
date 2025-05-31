"use client";

import { useEffect, useState } from "react";
import Stripe from "../icons/Stripe";
import { Card, CardTitle } from "../ui/card";
import ApplePay from "../icons/ApplePay";
import MasterCard from "../icons/MasterCard";
import { Separator } from "../ui/separator";
import PayPal from "../icons/PayPal";
import { cn } from "@/lib/utils";

type Payment = "stripe" | "applePay" | "masterCard" | "payPal";

interface PaymentMethodProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ setRefresh }) => {
  const [paymentMethod, setPaymentMethod] = useState<Payment>("stripe");

  useEffect(() => {
    localStorage.setItem("paymentMethod", "stripe");
  }, []);
  
  const handlePaymentMethod = (method: Payment) => {
    setPaymentMethod(method);
    localStorage.setItem("paymentMethod", method);
    setRefresh((prev) => !prev);
  };

  return (
    <section>
      <h3 className="text-2xl font-medium mb-4 text-center sm:text-left">Payment Method</h3>
      <Card className="flex flex-col sm:flex-row h-auto border border-special text-icons">
        <div
          className={cn(
            "flex gap-3 items-center py-6 pl-6 pr-4 cursor-pointer hover:bg-highlights hover:text-cards",
            {
              "bg-highlights text-cards": paymentMethod === "stripe",
            }
          )}
          onClick={() => handlePaymentMethod("stripe")}
        >
          <Stripe className="h-7.5" />
          <CardTitle className="text-lg font-medium">Stripe</CardTitle>
        </div>
        <Separator orientation="vertical" />
        <div
          className={cn(
            "flex gap-3 items-center py-6 px-4 cursor-pointer hover:bg-highlights hover:text-cards",
            {
              "bg-highlights text-cards": paymentMethod === "applePay",
            }
          )}
          onClick={() => handlePaymentMethod("applePay")}
        >
          <ApplePay className="h-7.5" />
          <CardTitle className="text-lg font-medium">Apple Pay</CardTitle>
        </div>
        <Separator orientation="vertical" />
        <div
          className={cn(
            "flex gap-3 items-center py-6 px-4 cursor-pointer hover:bg-highlights hover:text-cards",
            {
              "bg-highlights text-cards": paymentMethod === "masterCard",
            }
          )}
          onClick={() => handlePaymentMethod("masterCard")}
        >
          <MasterCard className="h-7.5" />
          <CardTitle className="text-lg font-medium">Master Card</CardTitle>
        </div>
        <Separator orientation="vertical" />
        <div
          className={cn(
            "flex gap-3 items-center py-6 px-4 cursor-pointer hover:bg-highlights hover:text-cards",
            {
              "bg-highlights text-cards": paymentMethod === "payPal",
            }
          )}
          onClick={() => handlePaymentMethod("payPal")}
        >
          <PayPal className="h-7.5" />
          <CardTitle className="text-lg font-medium">Pay Pal</CardTitle>
        </div>
      </Card>
    </section>
  );
};

export default PaymentMethod;
