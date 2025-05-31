"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { Category } from "@/types";

const useCategories = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(`/api/categories`, {
          method: "GET",
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error(
            "Failed to load product categories - no server response."
          );
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setCategories(data);
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
  }, [showSnackbar]);
  return { categories, loading, error, errorMessage };
};

export default useCategories;
