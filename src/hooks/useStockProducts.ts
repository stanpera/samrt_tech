"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { Stock } from "@/types";

interface UseStockProducts {
  stockProducts: Stock[] | null | undefined;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const useStockProducts = (
  value: string,
  refresh: boolean
): UseStockProducts => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [stockProducts, setStockProducts] = useState<Array<Stock>>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchStockProducts = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(`/api/stock${value}`, {
          method: "GET",
        });
        const data = await response.json();

        if (!response.ok) {
          if (data.error) {
            throw new Error(data.error);
          } else {
            throw new Error(
              "Failed to load product from stock - no server response."
            );
          }
        }
        setStockProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          {
            showSnackbar(error.message, "error");
          }
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving product data from stock.",
            "error"
          );
        }
        setError(true);
        setErrorMessage("Data is currently unavailable");
      } finally {
        setLoading(false);
      }
    };
    fetchStockProducts();
  }, [value, refresh, showSnackbar]);
  return { stockProducts, loading, error, errorMessage };
};

export default useStockProducts;
