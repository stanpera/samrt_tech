"use client";
import { useEffect, useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import { Checkbox } from "./ui/checkbox";
import ArrowUp from "./icons/ArrowUp";
import { Button } from "./ui/button";
import useCategories from "@/hooks/useCategories";
import { Plus } from "lucide-react";
import Minus from "./icons/Minus";
import CurrencyInput from "react-currency-input-field";
import { useProductsContext } from "@/context/ProductProvider";

const SideFilter = () => {
  const { categories, loading, error } = useCategories();
  const { setCategory, setMinPrice, setMaxPrice, setPage } =
    useProductsContext();

  const [isCategoryVisible, setIsCategoryVisible] = useState(true);
  const [isRestCategoriesVisible, setIsRestCategoriesVisible] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(true);
  const [isCheck, setIsCheck] = useState<Array<string>>([]);

  const [isPriceVisible, setIsPriceVisible] = useState(true);

  const handleCategories = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const handleMoreCategories = () => {
    setIsRestCategoriesVisible((prev) => !prev);
  };

  const handleSelectAll = () => {
    setIsCheck([]);
    setIsCheckAll((prev) => !prev);
  };

  const handleClick = (id: string) => {
    setIsCheck((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setIsCheckAll(false);
  };

  const handlePrice = () => {
    setIsPriceVisible((prev) => !prev);
  };

  const handleMinPrice = (value: string | undefined) => {
    if (value) {
      const parsedValue = parseFloat(value.replace("€", ""));
      setMinPrice(parsedValue);
    }
  };

  const handleMaxPrice = (value: string | undefined) => {
    if (value) {
      const parsedValue = parseFloat(value.replace("€", ""));
      setMaxPrice(parsedValue);
    }
  };
  useEffect(() => {
    if (isCheckAll) {
      setCategory(["all"]);
      setPage(0);
    } else {
      setCategory(isCheck);
      setPage(0);
    }
  }, [isCheckAll, isCheck]);

  if (error || loading) {
    return;
  }

  return (
    <div className="flex flex-col w-[363px] h-full p-10 gap-13 border-r border-special">
      <div className="flex flex-col px-2.5 gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Category</h2>
          {isCategoryVisible ? (
            <Button onClick={handleCategories} variant="icon">
              <ArrowUp className="h-6 w-6 hover:text-highlights cursor-pointer" />
            </Button>
          ) : (
            <Button onClick={handleCategories} variant="icon">
              <ArrowDown className="h-6 w-6 hover:text-highlights cursor-pointer" />
            </Button>
          )}
        </div>
        {isCategoryVisible && (
          <div className="flex flex-col gap-5 px-2 font-medium text-icons">
            <div className="flex items-center gap-4">
              <Checkbox
                id="all"
                name="all"
                onChange={handleSelectAll}
                isChecked={isCheckAll || isCheck.length === 0}
              />
              <label htmlFor="all" className="font-medium">
                All
              </label>
            </div>

            {categories?.slice(0, 4).map(({ id, name }) => (
              <div className="flex items-center gap-4" key={id}>
                <Checkbox
                  id={id.toString()}
                  name={name}
                  onChange={() => handleClick(id.toString())}
                  isChecked={isCheck.includes(id.toString())}
                />
                <label htmlFor={id.toString()} className="font-medium">
                  {name}
                </label>
              </div>
            ))}
            {isRestCategoriesVisible &&
              categories?.slice(4).map(({ id, name }) => (
                <div className="flex items-center gap-4" key={id}>
                  <Checkbox
                    id={id.toString()}
                    name={name}
                    onChange={() => handleClick(id.toString())}
                    isChecked={isCheck.includes(id.toString())}
                  />
                  <label htmlFor={id.toString()} className="font-medium">
                    {name}
                  </label>
                </div>
              ))}
            {!isRestCategoriesVisible && (
              <Button
                onClick={handleMoreCategories}
                variant="icon"
                size="icon"
                className="items-center flex gap-3.5"
              >
                Load More
                <Plus className="h-5 w-5 hover:text-highlights cursor-pointer" />
              </Button>
            )}
            {isRestCategoriesVisible && (
              <Button
                onClick={handleMoreCategories}
                variant="icon"
                size="icon"
                className="items-center flex gap-3.5"
              >
                Show Less
                <Minus className="h-5 w-5 hover:text-highlights cursor-pointer" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col px-2.5 gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Price</h2>
          {isPriceVisible ? (
            <Button onClick={handlePrice} variant="icon">
              <ArrowUp className="h-6 w-6 hover:text-highlights cursor-pointer" />
            </Button>
          ) : (
            <Button onClick={handlePrice} variant="icon">
              <ArrowDown className="h-6 w-6 hover:text-highlights cursor-pointer" />
            </Button>
          )}
        </div>
        {isPriceVisible && (
          <>
            <div className="flex items-center text-icons">
              <CurrencyInput
                id="min-price"
                name="min-price"
                placeholder="€ Min Price"
                defaultValue={10}
                decimalsLimit={2}
                prefix="€"
                step={1.0}
                allowNegativeValue={false}
                disableGroupSeparators={true}
                onValueChange={handleMinPrice}
                className="bg-cards h-13.5 w-39 border border-r-0 border-special rounded-l-md py-3.5 px-4.5"
              />
              <Button className="hover:text-highlights gap-3 rounded-l-none border border-special flex bg-cards h-13.5 flex-1 items-center py-3.5 px-4.5">
                EUR
                <ArrowDown className="w-6 h-6 hover:bg-none" />
              </Button>
            </div>
            <div className="flex items-center text-icons">
              <CurrencyInput
                id="max-price"
                name="max-price"
                placeholder="€ Max Price"
                decimalsLimit={2}
                prefix="€"
                step={1.0}
                allowNegativeValue={false}
                disableGroupSeparators={true}
                onValueChange={handleMaxPrice}
                className="bg-cards h-13.5 w-39 border border-r-0 border-special rounded-l-md py-3.5 px-4.5"
              />
              <Button className="hover:text-highlights gap-3 rounded-l-none border border-special flex bg-cards h-13.5 flex-1 items-center py-3.5 px-4.5">
                EUR
                <ArrowDown className="w-6 h-6 hover:bg-none" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideFilter;
