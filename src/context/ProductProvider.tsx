"use client"

import { ReactNode, createContext, useContext } from "react"; // Upewnij się, że ReactNode jest zaimportowany
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
  category: string[]
  setCategory: (category: string[]) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setLimit: (num: number) => void;
  setSortOrder: (value: string) => void;
  setPage: (page: number) => void;
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
    setCategory,
    setMinPrice,
    setMaxPrice,
    setLimit,
    setSortOrder,
    setPage,
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
    setCategory,
    setMinPrice,
    setMaxPrice,
    setLimit,
    setSortOrder,
    setPage,
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
