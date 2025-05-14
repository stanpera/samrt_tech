"use client";

import { Order } from "@/types";
import { useState, useEffect } from "react";

const useOrderData = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        setError(null);
        const orderId = localStorage.getItem("orderId");
        if (!orderId) {
          throw new Error("No order ID found");
        }

        const response = await fetch(`/api/order?id=${orderId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch order data");
        }

        const data = await response.json();
        setOrder(data);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "Unknown error occurred while fetching order data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);
  return { error, loading, order };
};

export default useOrderData;
