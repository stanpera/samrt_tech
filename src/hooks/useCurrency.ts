"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";

interface Currency {
  base: string;
  date: string;
  rates: object;
}
const useCurrency = () => {
  const [currency, setCurrency] = useState<Currency>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("api/currency", {
          method: "GET",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setCurrency(data);
      } catch {
        return;
      }
    };
    fetchCategories();
  }, [showSnackbar]);
  return { currency };
};

export default useCurrency;
