"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { Product } from "@/types";
import { BASE_URL } from "@/lib/baseURL";

interface UseSingleProductType {
  product: Product | undefined;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const useSingleProduct = (id: string): UseSingleProductType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [product, setProduct] = useState<Product>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to load product - no server response.");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProduct(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          {
            showSnackbar("error.message", "error");
          }
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving product data.",
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
  }, [showSnackbar, id]);
  return { product, loading, error, errorMessage };
};

export default useSingleProduct;
