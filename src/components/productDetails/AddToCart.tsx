"use client";

import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { FC, useEffect, useState } from "react";
import Check from "../icons/Check";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ShoppingCard from "../icons/ShoppingCard";
import { useSnackbar } from "@/context/SnackbarContext";
import { Input } from "../ui/input";
import Exit from "../icons/Exit";

interface AddToCartProps {
  product: Product | undefined;
}

interface CartItemsProps {
  stockId: number;
  productId: number;
  color: string;
  quantity: number;
  category: string;
  name: string;
  price: number;
  totalAmount: number;
  image: string;
}

interface convertionProps {
  rate: number;
  symbol: "\u0024" | "\u20AC" | "\u00A3";
}

const AddToCart: FC<AddToCartProps> = ({ product }) => {
  const [activeStockId, setActiveStockId] = useState<number>();
  const [activeStockColor, setActiveStockColor] = useState<string>();
  const [activeStockAmount, setActiveStockAmount] = useState<number>(0);
  const [addedProduct, setAddedProduct] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [iseInputEdit, setIsInputEdit] = useState<boolean>(false);
  const [stockColors, setStockColors] =
    useState<Array<Array<number> | null> | null>();
  const { showSnackbar } = useSnackbar();

  const [convertion, setConvertion] = useState<convertionProps>({
    rate: 1,
    symbol: "\u0024",
  });

    useEffect(() => {
    const currency = localStorage.getItem("currentCurrency");
    if (currency) {
      const currencyData = JSON.parse(currency);
      const currentCurrency = currencyData.currentCurrency;
      const rate = parseFloat(currencyData[currentCurrency]);

      const symbol =
        currentCurrency === "USD"
          ? "\u0024"
          : currentCurrency === "EUR"
          ? "\u20AC"
          : "\u00A3";

      setConvertion({ rate: rate, symbol: symbol });
    }
  }, []);

  useEffect(() => {
    const productInStock: number | undefined = product?.stocks
      ?.map((stock) => stock.amount)
      .reduce<number>((acc, current) => acc + (current ?? 0), 0);

    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      const cartItemsArray: CartItemsProps[] = JSON.parse(cartItems);

      const allAvailableProductStocks = product?.stocks?.map(
        (stock) => stock.id
      );
      const myCartProducts = cartItemsArray.map((p) => p.stockId);
      const stocksToCount = myCartProducts.filter((stockId) =>
        allAvailableProductStocks?.includes(stockId)
      );

      const qunatity = stocksToCount.map((id) => {
        const findProduct = cartItemsArray.find((c) => c.stockId === id);
        return findProduct ? findProduct.quantity : 0;
      });

      const cartQuantity = qunatity.reduce((acc, val) => acc + val, 0);

      const quantityAfterAddToCart = productInStock
        ? productInStock - cartQuantity
        : 0;

      setActiveStockAmount(quantityAfterAddToCart);
      setAddedProduct(quantityAfterAddToCart < 1 ? 0 : 1);
      setSubtotal(quantityAfterAddToCart < 1 ? product?.price || 0 : 0);
    } else {
      setActiveStockAmount(productInStock ? productInStock : 0);
      setAddedProduct(1);
      setSubtotal(product?.price || 0);
    }
  }, [product]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      const cartItemsArray: CartItemsProps[] = JSON.parse(cartItems);

      const allAvailableProductStocks = product?.stocks?.map(
        (stock) => stock.id
      );
      console.log(allAvailableProductStocks);

      const myCartProducts = cartItemsArray.map((p) => p.stockId);
      const stocksToCount = myCartProducts.filter((stockId) =>
        allAvailableProductStocks?.includes(stockId)
      );

      const inStockColors = stocksToCount.map((id) => {
        const findProduct = cartItemsArray.find((c) => c.stockId === id);
        return findProduct ? [findProduct.stockId, findProduct.quantity] : null;
      });
      setStockColors(inStockColors);
    }
  }, [product, activeStockAmount]);

  const handleStock = ({
    id,
    color,
    amount,
  }: {
    id: number;
    color: string;
    amount: number;
  }) => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const cartItemsArray: CartItemsProps[] = JSON.parse(cartItems);

      const index = cartItemsArray.findIndex((cart) => cart.stockId === id);

      if (index !== -1) {
        const isEmpty =
          cartItemsArray[index].totalAmount === cartItemsArray[index].quantity;

        const actualTotalAmount =
          cartItemsArray[index].totalAmount - cartItemsArray[index].quantity;

        setActiveStockAmount(isEmpty ? 0 : actualTotalAmount);
        setActiveStockId(id);
        setActiveStockColor(color);
        setAddedProduct(isEmpty ? 0 : 1);
      } else if (amount > 0) {
        setActiveStockId(id);
        setActiveStockColor(color);
        setActiveStockAmount(amount);
        setAddedProduct(1);
      } else if (amount < 1) {
        setActiveStockId(id);
        setActiveStockColor(color);
        setActiveStockAmount(amount);
        setAddedProduct(0);
      }
    } else if (amount > 0) {
      setActiveStockId(id);
      setActiveStockColor(color);
      setActiveStockAmount(amount);
      setAddedProduct(1);
    } else if (amount < 1) {
      setActiveStockId(id);
      setActiveStockColor(color);
      setActiveStockAmount(amount);
      setAddedProduct(0);
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

  useEffect(() => {
    const totalAmount = parseFloat(
      (product?.price ? product?.price * addedProduct : 0).toFixed(2)
    );
    setSubtotal(totalAmount);
  }, [addedProduct, product?.price]);

  const handleCart = () => {
    if (!activeStockId || addedProduct < 1 || typeof subtotal !== "number") {
      setError(true);
    } else {
      const productToCart: CartItemsProps = {
        stockId: activeStockId,
        productId: product?.id || NaN,
        color: activeStockColor || "",
        quantity: addedProduct,
        category: product?.category?.name || "",
        name: product?.name || "",
        price: product?.price || NaN,
        totalAmount: activeStockAmount,
        image: product?.images ? product?.images[0]?.url : "",
      };

      const cartItems = localStorage.getItem("cartItems");

      if (cartItems) {
        const cartItemsArray: CartItemsProps[] = JSON.parse(cartItems);

        const index = cartItemsArray.findIndex(
          (cart) => cart.stockId === productToCart.stockId
        );

        if (index !== -1) {
          const itemExist = cartItemsArray[index];
          if (productToCart.quantity <= productToCart.totalAmount) {
            cartItemsArray[index] = {
              ...itemExist,
              quantity: itemExist.quantity + productToCart.quantity,
            };
            localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
            setActiveStockAmount(
              productToCart.totalAmount - productToCart.quantity
            );
            showSnackbar(
              `${addedProduct} ${
                addedProduct > 1 ? "products" : "product"
              } added to cart`,
              "success"
            );
          } else {
            showSnackbar("Available quantity exceeded", "warning");
          }
        } else if (index === -1) {
          cartItemsArray.push(productToCart);
          localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
          setActiveStockAmount(
            productToCart.totalAmount - productToCart.quantity
          );
          showSnackbar(
            `${addedProduct} ${
              addedProduct > 1 ? "products" : "product"
            } added to cart`,
            "success"
          );
        }
      } else {
        const cartItemsArray = [productToCart];
        localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
        setActiveStockAmount(
          productToCart.totalAmount - productToCart.quantity
        );
        showSnackbar("Product added to cart", "success");
      }
    }
    if (activeStockAmount === 0) {
      setActiveStockAmount(0);
    }
  };
  useEffect(() => {
    if (addedProduct > activeStockAmount) {
      setAddedProduct(activeStockAmount);
    }
  }, [activeStockAmount, addedProduct]);

  const handleInputEdit = () => {
    setIsInputEdit(true);
  };

  const handleInputBlur = () => {
    setIsInputEdit(false);
  };

  const handleInputProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value <= activeStockAmount) {
      setAddedProduct(value);
    }
  };

  return (
    <Card className="flex flex-col items-start w-full h-auto sm:w-[423px]  sm:min-h-[430px] gap-3 sm:gap-8 p-6 border border-special text-icons">
      <div className="flex flex-col gap-3.5">
        <p className="text-lg font-medium">Colors</p>
        <div className="flex gap-4">
          {product?.stocks?.map((stock) => (
            <div
              key={stock.id}
              onClick={() =>
                handleStock({
                  id: stock.id,
                  color: stock?.color || "black",
                  amount: stock?.amount || 0,
                })
              }
              className={cn(
                "relative flex w-10 h-10 sm:w-13 sm:h-13 rounded-md items-center justify-center border border-special",
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
                  "cursor-pointer":
                    stock.amount &&
                    stock.amount -
                      (stockColors?.find((arr) => arr?.[0] === stock.id)?.[1] ||
                        0) >
                      0,
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
              {activeStockId === stock.id &&
              stock.amount &&
              stock.amount -
                (stockColors?.find((arr) => arr?.[0] === stock.id)?.[1] || 0) >
                0 ? (
                <>
                  <Check
                    className={cn(
                      "w-6 h-6 absolute text-background font-bold self-center",
                      {
                        "text-special": stock.color === "black",
                      }
                    )}
                  />
                </>
              ) : (
                <p></p>
              )}
              {!stock.amount ||
              (stock.amount &&
                stock.amount -
                  (stockColors?.find((arr) => arr?.[0] === stock.id)?.[1] ||
                    0) <
                  1) ? (
                <>
                  <div
                    className="absolute w-full h-full"
                    onClick={() =>
                      showSnackbar("Product out of stock", "warning")
                    }
                  >
                    <Exit
                      className={cn("text-background opacity-40 font-bold", {
                        "text-special": stock.color === "black",
                      })}
                    />
                  </div>
                </>
              ) : (
                <p></p>
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
        <div className="flex items-center  justify-start gap-4">
          <div className="flex border border-special items-center justify-center rounded-md py-3.5 px-5 gap-3.5 h-13 w-35">
            <Button
              onClick={handleMinus}
              variant="icon"
              size="icon"
              className={cn(
                "w-6 h-6 flex justify-center items-cente cursor-pointer hover:text-highlights items-center",
                {
                  "cursor-auto text-special": addedProduct < 1,
                }
              )}
            >
              <Minus className="w-4 h-4" />
            </Button>
            {iseInputEdit ? (
              <Input
                type="number"
                value={String(addedProduct)}
                onChange={handleInputProduct}
                onBlur={handleInputBlur}
                className="no-inputArrow border-none w- p-0 m-0 w-10 text-center"
                autoFocus
              />
            ) : (
              <div
                onClick={handleInputEdit}
                className="font-medium cursor-pointer"
              >
                {addedProduct}
              </div>
            )}
            <Button
              onClick={handlePlus}
              variant="icon"
              size="icon"
              className={cn(
                "w-6 h-6 flex justify-center items-cente cursor-pointer hover:text-highlights  items-center",
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
        {error &&
          typeof product?.price !== "undefined" &&
          subtotal < product?.price &&
          addedProduct > 0 && (
            <p className="text-error text-sm text-center">Invalid value</p>
          )}
        <p className="text-[28px] font-medium">{`${convertion?.symbol}${(
          convertion?.rate * subtotal
        ).toFixed(2)}`}</p>
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

export default AddToCart;
