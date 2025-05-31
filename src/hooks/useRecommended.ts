"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { Product } from "@/types";

const useRecommended = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [recommendedProducts, setrecommendedProducts] = useState<Product[]>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(`/api/products/random`, {
          method: "GET",
          cache: "default",
        });

        if (!response.ok) {
          throw new Error(
            "Failed to load recommended product - no server response."
          );
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setrecommendedProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          showSnackbar(error.message, "error");
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving recommended product data.",
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
  }, [showSnackbar]);
  return { recommendedProducts, loading, error, errorMessage };
};

export default useRecommended;
