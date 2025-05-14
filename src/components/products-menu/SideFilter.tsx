"use client";

import { useEffect, useState } from "react";

import useCategories from "@/hooks/useCategories";
import { useProductsContext } from "@/context/ProductProvider";

import { useSearchParams } from "next/navigation";
import OptionsHandler from "../products-menu/OptionsHandler";
import useBrands from "@/hooks/useBrands";
import PriceHandler from "../products-menu/PriceHandler";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

const SideFilter = () => {
  const searchParams = useSearchParams();
  const paramsCategory = searchParams.get("category");
  const paramsBrand = searchParams.get("brand");

  const { categories, loading, error, errorMessage } = useCategories();
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
      const currencyData = JSON.parse(localStorageCurrency);

      const currentCurrency = currencyData.currentCurrency;

      setCurrentCurrency(currentCurrency);
    }
  }, [setCurrentCurrency]);

  const [isCheckAllCategory, setIsCheckAllCategory] = useState(true);
  const [isCheckCategory, setIsCheckCategory] = useState<Array<string>>([]);
  const [isCheckAllBrand, setIsCheckAllBrand] = useState(true);
  const [isCheckBrand, setIsCheckBrand] = useState<Array<string>>([]);

  useEffect(() => {
    setMinPrice(10);
    setMaxPrice(NaN);
  }, [currentCurrency, setMaxPrice, setMinPrice]);

  useEffect(() => {
    if (isCheckAllCategory) {
      setCategory(["all"]);
      setPage(0);
    } else {
      setCategory(isCheckCategory);
      setPage(0);
    }
  }, [isCheckAllCategory, isCheckCategory, setCategory, setPage]);

  useEffect(() => {
    if (isCheckAllBrand) {
      setBrand(["all"]);
      setPage(0);
    } else {
      setBrand(isCheckBrand);
      setPage(0);
    }
  }, [isCheckAllBrand, isCheckBrand, setBrand, setPage]);

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
  }, [paramsBrand, paramsCategory, setBrand, setCategory]);

  if (loading) {
    return (
      <div className="flex flex-col w-[463px] h-full p-10 gap-13 border-r border-special">
        <Skeleton className="h-50 w-[283px]" />
        <Skeleton className="h-50 w-[283px]" />
        <Skeleton className="h-50 w-[283px]" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col w-[463px] h-full p-10 gap-13 border-r border-special">
        <Card className="h-50 w-[283px] justify-center items-center text-icons">
          {errorMessage}
        </Card>
        <Card className="h-50 w-[283px] justify-center items-center text-icons">
          {errorMessage}
        </Card>
        <Card className="h-50 w-[283px] justify-center items-center text-icons">
          {errorMessage}
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full sm:w-[363px] h-auto sm:h-full p-5 sm:p-10 gap-13 sm:border-r sm:border-special ">
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
