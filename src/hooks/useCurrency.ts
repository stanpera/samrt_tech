"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";

interface Currency {
  base: string;
  date: string;
  rates: object;
}
const useCurrency = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(
          "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=f4e207c12d584a9f8fa2e7977e78fece&symbols=GBP,USD,EUR",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load product categories - no server response."
          );
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        console.log("data", data);
        setCurrency(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          {
            showSnackbar(error.message, "error");
          }
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving product category data.",
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
  }, []);
  return { currency, loading, error, errorMessage };
};

export default useCurrency;
