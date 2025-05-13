import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrencyInput from "react-currency-input-field";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FC, useState } from "react";
import useCurrency from "@/hooks/useCurrency";

interface PriceHandlerProps {
  minPrice: number;
  maxPrice: number;
  currentCurrency: string;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setCurrentCurrency: (currentCurrency: string) => void;
}

const PriceHandler: FC<PriceHandlerProps> = ({
  minPrice,
  maxPrice,
  currentCurrency,
  setMinPrice,
  setMaxPrice,
  setCurrentCurrency,
}) => {
  const [isPriceVisible, setIsPriceVisible] = useState(true);
  const { currency } = useCurrency();

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

  const handleCurrency = (currentCurrency: string) => {
    setCurrentCurrency(currentCurrency);
    if (currency?.rates) {
      const chosenCurrency = {
        ...currency?.rates,
        currentCurrency: currentCurrency,
      };

      localStorage.setItem("currentCurrency", JSON.stringify(chosenCurrency));
    } else {
      const chosenCurrency = {
        EUR: "0.88315",
        GBP: "0.75061",
        USD: "1.0",
        currentCurrency: currentCurrency,
      };
      localStorage.setItem("currentCurrency", JSON.stringify(chosenCurrency));
    }
  };

  return (
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
              placeholder={
                currentCurrency === "EUR"
                  ? "\u20AC Min Price"
                  : currentCurrency === "USD"
                  ? "\u0024 Min Price"
                  : "\u00A3 Min Price"
              }
              decimalsLimit={2}
              prefix={
                currentCurrency === "EUR"
                  ? "\u20AC "
                  : currentCurrency === "USD"
                  ? "\u0024 "
                  : "\u00A3 "
              }
              step={1.0}
              allowNegativeValue={false}
              disableGroupSeparators={true}
              onValueChange={handleMinPrice}
              value={minPrice}
              className="bg-cards h-13.5 w-full border border-r-0 border-special rounded-l-md py-3.5 px-4.5"
            />
            <Select
              value={currentCurrency}
              onValueChange={(value) => handleCurrency(value)}
            >
              <SelectTrigger className="hover:text-highlights gap-3 rounded-l-none border border-special flex bg-cards h-13.5 flex-1 items-center py-3.5 px-4.5 text-base font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <>
                    {["USD", "EUR", "GBP"].map((value, index) => (
                      <SelectItem key={index} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center text-icons">
            <CurrencyInput
              id="max-price"
              name="max-price"
              placeholder={
                currentCurrency === "EUR"
                  ? "\u20AC Max Price"
                  : currentCurrency === "USD"
                  ? "\u0024  Max Price"
                  : "\u00A3 Max Price"
              }
              decimalsLimit={2}
              prefix={
                currentCurrency === "EUR"
                  ? "\u20AC "
                  : currentCurrency === "USD"
                  ? "\u0024 "
                  : `\u00A3 `
              }
              step={1.0}
              value={maxPrice > 0 ? maxPrice : ""}
              allowNegativeValue={false}
              disableGroupSeparators={true}
              onValueChange={handleMaxPrice}
              className="bg-cards h-13.5 w-39 border border-r-0 border-special rounded-l-md py-3.5 px-4.5"
            />
            <Select
              value={currentCurrency}
              onValueChange={(value) => handleCurrency(value)}
            >
              <SelectTrigger className="hover:text-highlights gap-3 rounded-l-none border border-special flex bg-cards h-13.5 flex-1 items-center py-3.5 px-4.5 text-base font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <>
                    {["USD", "EUR", "GBP"].map((value, index) => (
                      <SelectItem key={index} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceHandler;
