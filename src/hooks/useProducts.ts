"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";

const useProducts = () => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const brandFromUrl = searchParams.get("brand");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [category, setCategory] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : ["all"]
  );
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<string>("latest");
  const [page, setPage] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(NaN);
  const [brand, setBrand] = useState<string[]>(
    brandFromUrl ? [brandFromUrl] : ["all"]
  );
  const [productId, setProductId] = useState<string>("none");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage("");

      const categoryToString = category?.join(",");
      const brandToString = brand?.join(",");

      try {
        const response = await fetch(
          `/api/products?category=${categoryToString}&brand=${brandToString}&minPrice=${minPrice}&maxPrice=${maxPrice}&limit=${limit}&offset=${
            page * limit
          }&sortBy=${sortOrder}&productId=${productId}`,
          {
            method: "GET",
            cache: "force-cache",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load specific product - no server response."
          );
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setProducts(data.productsWithOneImage);
        setTotalProducts(data.totalCount);
      } catch (error: unknown) {
        if (error instanceof Error) {
          {
            showSnackbar(`${error.message}`, "error");
          }
        } else {
          showSnackbar(
            "An unexpected error occurred while retrieving specific product data.",
            "error"
          );
        }
        setError(true);
        setErrorMessage("Data is currently unavailable");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [
    sortOrder,
    category,
    minPrice,
    maxPrice,
    page,
    limit,
    brand,
    showSnackbar,
    productId,
  ]);

  return {
    products,
    totalProducts,
    loading,
    error,
    errorMessage,
    page,
    limit,
    sortOrder,
    category,
    minPrice,
    maxPrice,
    brand,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setLimit,
    setSortOrder,
    setPage,
    setBrand,
    setProductId,
  };
};

export default useProducts;
