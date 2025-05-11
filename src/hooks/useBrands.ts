"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { Brand } from "@/types";
import { BASE_URL } from "@/lib/baseURL";

const useBrands = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(`${BASE_URL}/api/brands`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to load brands list - no server response.");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setBrands(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          {
            showSnackbar(error.message, "error");
          }
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving brand list data.",
            "error"
          );
        }
        setError(true);
        setErrorMessage("Data is currently unavailable");
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [showSnackbar]);
  return { brands, loading, error, errorMessage };
};

export default useBrands;
