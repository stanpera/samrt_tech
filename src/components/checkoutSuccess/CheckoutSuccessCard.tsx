"use client";

import { cn } from "@/lib/utils";
import Check from "../icons/Check";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import FinalCheckoutProductCard from "./FinalCheckoutProductCard";
import { Button } from "../ui/button";
import useOrderData from "@/hooks/useOrderData";
import { Skeleton } from "../ui/skeleton";
import SadError from "../icons/sadError";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/SnackbarContext";
import { updateOrder } from "@/lib/fetch/updateOrder";

interface CurrentCurrencyProps {
  EUR: number;
  GBP: number;
  USD: number;
  currentCurrency: string;
}

const CheckoutSuccessCard = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { order, error, loading } = useOrderData();
  const defaultCurrency: CurrentCurrencyProps = {
    EUR: 0.88315,
    GBP: 0.75061,
    USD: 1.0,
    currentCurrency: "USD",
  };

  const [currency, setCurrency] =
    useState<CurrentCurrencyProps>(defaultCurrency);

  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  const [totalProductProtection, setTotalProductProtection] =
    useState<number>(0);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [orderId, setOrderId] = useState<number>(0);

  useEffect(() => {
    const currentCurrency = localStorage.getItem("currentCurrency");

    if (currentCurrency) {
      const parsedItems: CurrentCurrencyProps = JSON.parse(currentCurrency);
      setCurrency(parsedItems);
    }
    const totalProdPrice = order?.orderItems
      ?.map((item) => item.quantity * item.priceAtPurchase)
      ?.reduce((acc, val) => acc + val);

    const totalProdProtect = order?.orderItems
      ?.map((item) => item.quantity * item.productProtection)
      ?.reduce((acc, val) => acc + val);

    setTotalProductPrice(totalProdPrice ? totalProdPrice : 0);
    setTotalProductProtection(totalProdProtect ? totalProdProtect : 0);
    setProducts(order?.products ?? null);
    setOrderId(order?.id || 0);
  }, [order]);

  if (loading) {
    return <Skeleton className="w-[592px] h-[500px]" />;
  }

  if (error) {
    return (
      <Card className="w-[592px] h-[500px] items-center justify-center text-icons gap-2">
        <SadError className="w-10 h-10" />
        <p>{error}</p>
      </Card>
    );
  }

  const handleContinue = async () => {
    await updateOrder(orderId, showSnackbar);

    localStorage.removeItem("orderId");
    router.push(`/`);
  };

  return (
    <Card className="h-auto border border-special p-6 font-medium text-icons gap-4 mx-5 sm:mx-0">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center justify-center h-15 w-15 border-2 border-first-content rounded-[100%]">
          <Check className="h-[75%] w-[75%] text-first-content" />
        </div>
        <CardTitle className="text-[28px]">Thanks for Your Order!</CardTitle>
        <p className="text-highlights">Order number: {order?.orderNumber}</p>
      </div>
      <h5 className="text-lg text-first-content">Transaction Date</h5>
      <p>
        {order?.createdAt
          ? new Date(order.createdAt).toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          : "No date"}
      </p>
      <Separator />
      <h5 className="text-lg text-first-content">Payment Method</h5>
      <p>{order?.paymentMethod}</p>
      <Separator />
      <h5 className="text-lg text-first-content">Shipping Method</h5>
      <p>{order?.shippingMethod}</p>
      <Separator />
      <h5 className="text-lg text-first-content">Your Order</h5>
      <FinalCheckoutProductCard
        currency={currency}
        products={products ? products : null}
        totalAmount={order?.totalAmount ? order?.totalAmount : null}
      />
      <Separator />
      <div className="flex justify-between items-center">
        <p>
          Total Product Price ({order?.totalAmount}{" "}
          {order?.totalAmount && order.totalAmount > 1 ? "items" : "item"})
        </p>
        <p className="text-lg">
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * totalProductPrice).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * totalProductPrice).toFixed(2)}`
            : `\u0024${(currency.USD * totalProductPrice).toFixed(2)}`}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p>Total Product Protection</p>
        <p className="text-lg">
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * totalProductProtection).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * totalProductProtection).toFixed(2)}`
            : `\u0024${(currency.USD * totalProductProtection).toFixed(2)}`}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p>Total Shipping Price</p>
        <p className="text-lg">
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * (order?.shippingPrice ?? 0)).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * (order?.shippingPrice ?? 0)).toFixed(2)}`
            : `\u0024${(currency.USD * (order?.shippingPrice ?? 0)).toFixed(
                2
              )}`}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p>Shipping Insurance</p>
        <p className="text-lg">
          {" "}
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * (order?.shippingInsurance ?? 0)).toFixed(
                2
              )}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * (order?.shippingInsurance ?? 0)).toFixed(
                2
              )}`
            : `\u0024${(currency.USD * (order?.shippingInsurance ?? 0)).toFixed(
                2
              )}`}
        </p>
      </div>
      <Separator />
      <h5 className="text-lg text-first-content">Transaction Fees</h5>
      <div className="flex justify-between items-center">
        <p>Service Fees</p>
        <p className="text-lg">
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * (order?.serviceFees ?? 0)).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * (order?.serviceFees ?? 0)).toFixed(2)}`
            : `\u0024${(currency.USD * (order?.serviceFees ?? 0)).toFixed(2)}`}
        </p>
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <p className="text-lg text-first-content">Grand total</p>
        <p className="text-[28px]">
          {" "}
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(
                currency.EUR *
                (totalProductPrice +
                  (order?.serviceFees ?? 0) +
                  (order?.shippingInsurance ?? 0) +
                  (order?.shippingPrice ?? 0) +
                  totalProductProtection)
              ).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(
                currency.GBP *
                (totalProductPrice +
                  (order?.serviceFees ?? 0) +
                  (order?.shippingInsurance ?? 0) +
                  (order?.shippingPrice ?? 0) +
                  totalProductProtection)
              ).toFixed(2)}`
            : `\u0024${(
                currency.USD *
                (totalProductPrice +
                  (order?.serviceFees ?? 0) +
                  (order?.shippingInsurance ?? 0) +
                  (order?.shippingPrice ?? 0) +
                  totalProductProtection)
              ).toFixed(2)}`}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg text-first-content">Status</p>
        <div
          className={cn(
            "text-sm px-2.5 py-1.5 bg-success rounded-md text-icons",
            {}
          )}
        >
          Success
        </div>
      </div>
      <Button
        variant="form"
        size="form"
        className="mt-6"
        onClick={handleContinue}
      >
        Continue Shopping
      </Button>
    </Card>
  );
};

export default CheckoutSuccessCard;
