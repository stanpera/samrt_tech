"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { Order } from "@/types";

const useOrders = (queries: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(`/api/orders${queries}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to load user data - no server response.");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setOrders(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          {
            showSnackbar(error.message, "error");
          }
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving orders data.",
            "error"
          );
        }
        setError(true);
        setErrorMessage("Data is currently unavailable");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [queries, showSnackbar]);
  return { orders, loading, error, errorMessage };
};

export default useOrders;
