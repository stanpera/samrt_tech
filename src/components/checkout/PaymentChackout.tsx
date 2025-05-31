"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Skeleton } from "../ui/skeleton";
import { useSnackbar } from "@/context/SnackbarContext";

interface convertionProps {
  rate: number;
  symbol: "\u0024" | "\u20AC" | "\u00A3";
}

const PaymentCheckout = ({ amount }: { amount: number }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [convertion, setConvertion] = useState<convertionProps>({
    rate: 1,
    symbol: "\u0024",
  });

  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  useEffect(() => {
    const currency = localStorage.getItem("currentCurrency");
    if (currency) {
      const currencyData = JSON.parse(currency);
      const currentCurrency = currencyData.currentCurrency;
      const rate = parseFloat(currencyData[currentCurrency]);

      const symbol =
        currentCurrency === "USD"
          ? "\u0024"
          : currentCurrency === "EUR"
          ? "\u20AC"
          : "\u00A3";

      setConvertion({ rate: rate, symbol: symbol });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${baseUrl}/checkout/success`,
      },
    });

    if (error) {
      showSnackbar(
        "Problems making a payment. Please contact customer service.",
        "error"
      );
      setErrorMessage(error.message);
    } else {
      showSnackbar("Payment was made successfully", "success");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <Skeleton className="h-40" />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-cards hover:bg-background cursor-pointer mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading
          ? `Pay ${convertion.symbol}${(convertion.rate * amount).toFixed(2)}`
          : "Processing..."}
      </button>
    </form>
  );
};

export default PaymentCheckout;
