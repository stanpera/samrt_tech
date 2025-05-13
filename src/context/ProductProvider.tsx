"use client";

import { ReactNode, createContext, useContext, useState } from "react"; 
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";

interface ProductsContextType {
  products: Product[] | undefined;
  totalProducts: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  page: number;
  limit: number;
  sortOrder: string;
  category: string[];
  minPrice: number;
  maxPrice: number;
  setCategory: React.Dispatch<React.SetStateAction<Array<string>>>;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setLimit: (num: number) => void;
  setSortOrder: (value: string) => void;
  setPage: (page: number) => void;
  currentCurrency: string;
  setCurrentCurrency: (value: string) => void;
  setBrand: React.Dispatch<React.SetStateAction<Array<string>>>;
}

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [currentCurrency, setCurrentCurrency] = useState<string>("USD");
  const {
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
    setCategory,
    setMinPrice,
    setMaxPrice,
    setLimit,
    setSortOrder,
    setPage,
    setBrand,
  } = useProducts();

  const data = {
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
    currentCurrency,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setLimit,
    setSortOrder,
    setPage,
    setCurrentCurrency,
    setBrand,
  };

  return (
    <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
  );
};

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );
  }
  return context;
};
