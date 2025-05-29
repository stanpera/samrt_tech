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

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
    errorMessage: errorMessageCategories,
  } = useCategories();
  const { brands, loading: loadingBrands, error: errorBrands } = useBrands();

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
    setProductId,
  } = useProductsContext();

  useEffect(() => {
    const localStorageCurrency = localStorage.getItem("currentCurrency");

    if (localStorageCurrency) {
      const currencyData = JSON.parse(localStorageCurrency);

      const currentCurrency = currencyData.currentCurrency;

      setCurrentCurrency(currentCurrency);
    }
  }, [setCurrentCurrency]);

  const [isCheckAllCategory, setIsCheckAllCategory] = useState(false);
  const [isCheckCategory, setIsCheckCategory] = useState<Array<string>>([]);
  const [isCheckAllBrand, setIsCheckAllBrand] = useState(false);
  const [isCheckBrand, setIsCheckBrand] = useState<Array<string>>([]);

  useEffect(() => {
    setMinPrice("");
    setMaxPrice("");
  }, [currentCurrency, setMaxPrice, setMinPrice]);

  useEffect(() => {
    setProductId("none");
    if (isCheckAllCategory) {
      setCategory(["all"]);
      setPage(0);
    } else {
      setCategory(isCheckCategory);
      setPage(0);
    }
  }, [isCheckAllCategory, isCheckCategory, setCategory, setPage, setProductId]);

  useEffect(() => {
    setProductId("none");

    if (isCheckAllBrand) {
      setBrand(["all"]);
      setPage(0);
    } else {
      setBrand(isCheckBrand);
      setPage(0);
    }
  }, [isCheckAllBrand, isCheckBrand, setBrand, setPage, setProductId]);

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

  if (loadingCategories) {
    return (
      <div className="flex flex-col w-full h-full p-10 gap-13 border-r border-special">
        <Skeleton className="h-50 w-[250px]" />
        <Skeleton className="h-50 w-[250px]" />
        <Skeleton className="h-50 w-[250px]" />
      </div>
    );
  }
  if (errorCategories || errorBrands) {
    return (
      <div className="flex flex-col w-auto h-full p-10 gap-13 border-r border-special">
        <Card className="h-50 w-[250px] justify-center items-center text-icons">
          {errorMessageCategories}
        </Card>
        <Card className="h-50 w-[250px] justify-center items-center text-icons">
          {errorMessageCategories}
        </Card>
        <Card className="h-50 w-[250px] justify-center items-center text-icons">
          {errorMessageCategories}
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full sm:w-[363px] h-auto lg:h-[100%] p-5 lg:p-10 gap-5 lg:gap-13 lg:border-r lg:border-special">
      <OptionsHandler
        categories={categories}
        isCheckAll={isCheckAllCategory}
        isCheck={isCheckCategory}
        setIsCheckAll={setIsCheckAllCategory}
        setIsCheck={setIsCheckCategory}
        name="Category"
      />
      {!loadingBrands && (
        <OptionsHandler
          categories={brands}
          isCheckAll={isCheckAllBrand}
          isCheck={isCheckBrand}
          setIsCheckAll={setIsCheckAllBrand}
          setIsCheck={setIsCheckBrand}
          name="Brand"
        />
      )}
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
