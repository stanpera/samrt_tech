"use client";

import { useEffect, useState } from "react";

import useCategories from "@/hooks/useCategories";
import { useProductsContext } from "@/context/ProductProvider";

import { useSearchParams } from "next/navigation";
import OptionsHandler from "../products-menu/OptionsHandler";
import useBrands from "@/hooks/useBrands";
import PriceHandler from "../products-menu/PriceHandler";
import { Skeleton } from "../ui/skeleton";

const SideFilter = () => {
  const searchParams = useSearchParams();
  const paramsCategory = searchParams.get("category");
  const paramsBrand = searchParams.get("brand");

  const { categories, loading, error } = useCategories();
  const { brands } = useBrands();

  const {
    setCategory,
    setMinPrice,
    setMaxPrice,
    setPage,
    setCurrentCurrency,
    setBrand,
    currentCurrency,
    minPrice,
    maxPrice,
  } = useProductsContext();

  useEffect(() => {
    const localStorageCurrency = localStorage.getItem("currentCurrency");

    if (localStorageCurrency) {
      let currencyData = JSON.parse(localStorageCurrency);

      const currentCurrency = currencyData.currentCurrency;

      setCurrentCurrency(currentCurrency);
    }
  }, []);

  const [isCheckAllCategory, setIsCheckAllCategory] = useState(true);
  const [isCheckCategory, setIsCheckCategory] = useState<Array<string>>([]);
  const [isCheckAllBrand, setIsCheckAllBrand] = useState(true);
  const [isCheckBrand, setIsCheckBrand] = useState<Array<string>>([]);

  useEffect(() => {
    setMinPrice(10);
    setMaxPrice(NaN);
  }, [currentCurrency]);

  useEffect(() => {
    if (isCheckAllCategory) {
      setCategory(["all"]);
      setPage(0);
    } else {
      setCategory(isCheckCategory);
      setPage(0);
    }
  }, [isCheckAllCategory, isCheckCategory]);

  useEffect(() => {
    if (isCheckAllBrand) {
      setBrand(["all"]);
      setPage(0);
    } else {
      setBrand(isCheckBrand);
      setPage(0);
    }
  }, [isCheckAllBrand, isCheckBrand]);

  useEffect(() => {
    if (paramsCategory) {
      setIsCheckAllCategory(false);
      setIsCheckCategory([paramsCategory]);
      setCategory([paramsCategory]);
    }

    if (paramsBrand) {
      setIsCheckAllBrand(false);
      setIsCheckBrand([paramsBrand]);
      setBrand([paramsBrand]);
    }
  }, []);

  if (0 === 10) {
    return (
      <div className="flex flex-col bg-amber-950 w-[463px] h-full p-10 gap-13 border-r border-special">
        <Skeleton className="h-50 max-w-[283px]" />
        <Skeleton className="h-50 max-w-[283px]" />
        <Skeleton className="h-50 max-w-[283px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[363px] h-full p-10 gap-13 border-r border-special">
      <OptionsHandler
        categories={categories}
        isCheckAll={isCheckAllCategory}
        isCheck={isCheckCategory}
        setIsCheckAll={setIsCheckAllCategory}
        setIsCheck={setIsCheckCategory}
        name="Category"
      />
      <OptionsHandler
        categories={brands}
        isCheckAll={isCheckAllBrand}
        isCheck={isCheckBrand}
        setIsCheckAll={setIsCheckAllBrand}
        setIsCheck={setIsCheckBrand}
        name="Brand"
      />
      <PriceHandler
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        currentCurrency={currentCurrency}
        setCurrentCurrency={setCurrentCurrency}
      />
    </div>
  );
};

export default SideFilter;
