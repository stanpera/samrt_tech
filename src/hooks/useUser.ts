"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { User } from "@/types";
import { BASE_URL } from "@/lib/baseURL";

const useUser = (queries: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user, setUser] = useState<User>();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        const response = await fetch(`${BASE_URL}/api/user${queries}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to load user data - no server response.");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setUser(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          {
            showSnackbar(error.message, "error");
          }
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving user data.",
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
  }, [queries]);
  return { user, loading, error, errorMessage };
};

export default useUser;
