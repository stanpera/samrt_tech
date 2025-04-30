import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Stock } from "@/types";
import { FC, useEffect, useState } from "react";
import Check from "../icons/Check";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ShoppingCard from "../icons/ShoppingCard";
import { useSnackbar } from "@/context/SnackbarContext";

interface CheckColorProps {
  stocks: Stock[];
  price: number;
}
interface ActiveColor {
  id: number;
  color: string;
  productId: number;
  amount: number;
}

const CheckColor: FC<CheckColorProps> = ({ stocks, price }) => {
  const [isMouseDown, setIsMouseDown] = useState<string>("none");
  const [activeStockId, setActiveStockId] = useState<number>();
  const [activeStockAmount, setActiveStockAmount] = useState<number>(0);
  const [addedProduct, setAddedProduct] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const { showSnackbar } = useSnackbar();

  const productInStock: number = stocks
    ?.map((stock) => stock.amount)
    .reduce((acc, current) => acc + current);

  useEffect(() => {
    setSubtotal(price);
    setAddedProduct(1);
    setActiveStockAmount(productInStock);
  }, [price, stocks]);

  const handleStock = ({ id, amount }: { id: number; amount: number }) => {
    if (amount > 0) {
      setActiveStockId(id);
      setActiveStockAmount(amount);
    }
  };

  const handleMouseDownPlus = () => {
    if (
      typeof productInStock !== "undefined" &&
      addedProduct < productInStock
    ) {
      setIsMouseDown("plus");
    }
  };

  const handleMouseDownMinus = () => {
    if (addedProduct > 0) {
      setIsMouseDown("minus");
    }
  };

  const handlePlus = () => {
    if (
      typeof activeStockAmount !== "undefined" &&
      addedProduct < activeStockAmount
    ) {
      setAddedProduct((prev) => prev + 1);
    }
  };

  const handleMinus = () => {
    if (addedProduct > 0) {
      setAddedProduct((prev) => prev - 1);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown("none");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMouseDown === "plus") {
      interval = setInterval(() => {
        setAddedProduct((prev) => prev + 1);
      }, 300);
    } else if (isMouseDown === "minus") {
      interval = setInterval(() => {
        setAddedProduct((prev) => prev - 1);
      }, 300);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isMouseDown]);

  useEffect(() => {
    const totalAmount = parseFloat((price * addedProduct).toFixed(2));
    setSubtotal(totalAmount);
  }, [addedProduct]);

  const handleCart = () => {
    if (
      !activeStockId ||
      addedProduct < 1 ||
      // subtotal < price * addedProduct ||
      typeof subtotal !== "number"
    ) {
      setError(true);
    } else {
      const productToCart = {
        stockId: activeStockId,
        quantity: addedProduct,
      };

      const cartItems = localStorage.getItem("cartItems");

      if (cartItems) {
        let cartItemsArray = JSON.parse(cartItems);
        console.log("cartItemsArray", cartItemsArray);

        cartItemsArray = [...cartItemsArray, productToCart];
        localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
      } else {
        let cartItemsArray = [productToCart];
        localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
      }
      showSnackbar("Product added to cart", "success");
    }
  };

  return (
    <Card className="flex flex-col items-start w-[423px]  min-h-[430px] gap-8 p-6 border border-special text-icons">
      <div className="flex flex-col gap-3.5">
        <p className="text-lg font-medium">Colors</p>
        <div className="flex gap-4">
          {stocks?.map((stock, index) => (
            <div
              key={stock.id}
              onClick={() =>
                handleStock({ id: stock.id, amount: stock.amount })
              }
              className={cn(
                "relative flex w-13 h-13 rounded-md items-center justify-center border border-special",
                {
                  "bg-product-black": stock.color === "black",
                  "bg-product-gray": stock.color === "gray",
                  "bg-product-white": stock.color === "white",
                  "bg-product-orange": stock.color === "orange",
                  "bg-product-red": stock.color === "red",
                  "bg-product-yellow": stock.color === "yellow",
                  "bg-product-pink": stock.color === "pink",
                  "bg-product-blue": stock.color === "blue",
                  "bg-product-silver": stock.color === "silver",
                  "bg-conic-150/increasing from-violet-700 via-lime-300 to-violet-700":
                    stock.color === "multicolor",
                  "opacity-30": stock.amount < 1,
                }
              )}
            >
              <TooltipProvider>
                <Tooltip>
                  <div className="  h-full w-full">
                    <TooltipTrigger asChild>
                      <div className=" h-full w-full"></div>
                    </TooltipTrigger>
                    <TooltipContent
                      sideOffset={-25}
                      className=" text-sm text-second-content"
                    >
                      {stock.color}
                    </TooltipContent>
                  </div>
                </Tooltip>
              </TooltipProvider>
              {activeStockId === stock.id && stock.amount > 0 && (
                <Check
                  className={cn(
                    "w-6 h-6 absolute text-background font-bold self-center",
                    {
                      "text-special": stock.color === "black",
                    }
                  )}
                />
              )}
            </div>
          ))}
        </div>
        {!activeStockId && error && (
          <p className="text-error text-sm">You have to chose the color</p>
        )}
      </div>
      <div className="flex flex-col gap-3.5 w-full">
        <p className="font-medium text-lg">Quantity</p>
        <div className="flex items-center gap-4">
          <div className="flex border border-special items-center justify-center rounded-md py-3.5 px-5 gap-3.5">
            <Button
              onClick={handleMinus}
              onMouseDown={handleMouseDownMinus}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              variant="icon"
              size="icon"
              className={cn(
                "w-6 h-6 flex justify-center items-cente cursor-pointer hover:text-highlightsr items-center",
                {
                  "cursor-auto text-special": addedProduct < 1,
                }
              )}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <p className="font-medium">{addedProduct}</p>
            <Button
              onClick={handlePlus}
              onMouseDown={handleMouseDownPlus}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              variant="icon"
              size="icon"
              className={cn(
                "w-6 h-6 flex justify-center items-cente cursor-pointer hover:text-highlightsr  items-center",
                {
                  "cursor-auto text-special":
                    typeof activeStockAmount === "number" &&
                    addedProduct >= activeStockAmount,
                }
              )}
            >
              <Plus className="w-4 h-4 " />
            </Button>
          </div>
          <p className="font-medium">
            Stock: {""}
            {activeStockAmount}
          </p>
        </div>
        {addedProduct < 1 && error && (
          <p className="text-error text-sm">You have to add the product</p>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-medium">Subtotal</p>
        {error && subtotal < price && addedProduct > 0 && (
          <p className="text-error text-sm text-center">Invalid value</p>
        )}
        <p className="text-[28px] font-medium">{`\u20AC${subtotal.toFixed(
          2
        )}`}</p>
      </div>
      <Button
        onClick={handleCart}
        variant="outline"
        size="outline"
        className="flex w-full border-first-content font-medium text-first-content items-center justify-center gap-4 cursor-pointer hover:bg-highlights hover:border-transparent hover:text-cards"
      >
        <p>Add to Cart</p>
        <ShoppingCard className="h-6" />
      </Button>
    </Card>
  );
};

export default CheckColor;
