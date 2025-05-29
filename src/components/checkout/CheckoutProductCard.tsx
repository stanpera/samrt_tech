"use client";

import { useEffect, useState } from "react";
import EmptyImage from "../icons/EmptyImage";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Plus from "../icons/Plus";
import Minus from "../icons/Minus";
import { Textarea } from "../ui/textarea";
import Exit from "../icons/Exit";
import SnackbarInfo from "../icons/SnackbarIcon";

interface CartItemsProps {
  stockId: number;
  color: string;
  quantity: number;
  category: string;
  name: string;
  price: number;
  image: string;
  message?: string;
  productProtection?: boolean;
  totalAmount: number;
}
interface CurrentCurrencyProps {
  EUR: number;
  GBP: number;
  USD: number;
  currentCurrency: string;
}
interface CheckoutProductCardProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
const CheckoutProductCard: React.FC<CheckoutProductCardProps> = ({
  setRefresh,
}) => {
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");
  const [localStorageRefresh, setlocalStorageRefresh] =
    useState<boolean>(false);

  const defaultProducts: CartItemsProps[] = [];
  const defaultCurrency: CurrentCurrencyProps = {
    EUR: 0.88315,
    GBP: 0.75061,
    USD: 1.0,
    currentCurrency: "USD",
  };
  const [cartProducts, setCartProducts] =
    useState<CartItemsProps[]>(defaultProducts);
  const [currency, setCurrency] =
    useState<CurrentCurrencyProps>(defaultCurrency);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    const currentCurrency = localStorage.getItem("currentCurrency");

    if (storedItems) {
      const parsedItems: CartItemsProps[] = JSON.parse(storedItems);
      setCartProducts(parsedItems);
    } else {
      setCartProducts([]);
    }

    if (currentCurrency) {
      const parsedItems: CurrentCurrencyProps = JSON.parse(currentCurrency);
      setCurrency(parsedItems);
    }

    setRefresh((prev) => !prev);
  }, [activeNoteId, localStorageRefresh, setRefresh]);

  const handlePlus = (id: number) => {
    const indexOfProduct = cartProducts.findIndex((msg) => msg.stockId === id);

    const totalProductAmount = cartProducts[indexOfProduct].totalAmount;

    if (cartProducts[indexOfProduct].quantity < totalProductAmount) {
      cartProducts[indexOfProduct].quantity += 1;

      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          ...cartProducts.slice(0, indexOfProduct),
          cartProducts[indexOfProduct],
          ...cartProducts.slice(indexOfProduct + 1),
        ])
      );
    } else {
      cartProducts[indexOfProduct].totalAmount = totalProductAmount;

      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          ...cartProducts.slice(0, indexOfProduct),
          cartProducts[indexOfProduct],
          ...cartProducts.slice(indexOfProduct + 1),
        ])
      );
    }
    setlocalStorageRefresh((prev) => !prev);
  };
  const handleMinus = (id: number) => {
    const indexOfProduct = cartProducts.findIndex((msg) => msg.stockId === id);
    if (cartProducts[indexOfProduct].quantity > 1) {
      cartProducts[indexOfProduct].quantity -= 1;

      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          ...cartProducts.slice(0, indexOfProduct),
          cartProducts[indexOfProduct],
          ...cartProducts.slice(indexOfProduct + 1),
        ])
      );
    }
    setlocalStorageRefresh((prev) => !prev);
  };

  const handleMessagesFromClient = (id: number) => {
    setActiveNoteId(null);

    if (note.length > 0) {
      const indexOfProduct = cartProducts.findIndex(
        (msg) => msg.stockId === id
      );
      cartProducts[indexOfProduct].message = note;
      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          ...cartProducts.slice(0, indexOfProduct),
          cartProducts[indexOfProduct],
          ...cartProducts.slice(indexOfProduct + 1),
        ])
      );
    }
  };

  const handleProtection = (id: number) => {
    const indexOfProduct = cartProducts.findIndex((msg) => msg.stockId === id);

    cartProducts[indexOfProduct].productProtection =
      cartProducts[indexOfProduct].productProtection === false ||
      !cartProducts[indexOfProduct].productProtection
        ? (cartProducts[indexOfProduct].productProtection = true)
        : (cartProducts[indexOfProduct].productProtection = false);

    localStorage.setItem(
      "cartItems",
      JSON.stringify([
        ...cartProducts.slice(0, indexOfProduct),
        cartProducts[indexOfProduct],
        ...cartProducts.slice(indexOfProduct + 1),
      ])
    );
    setlocalStorageRefresh((prev) => !prev);
  };
    if (cartProducts.length < 1) {
    return (
      <Card className="flex w-full sm:w-[839px] h-[186px] border border-special p-6 justify-center items-center">
        <CardTitle className="text-icons">No products in cart.</CardTitle>
      </Card>
    );
  }

  return (
    <section>
      <h3 className="mb-4 text-2xl font-medium text-center sm:text-left">Your Order</h3>
      <div className="flex flex-col items-start gap-8 ">
        {cartProducts.map((prod) => (
          <Card
            key={prod.stockId}
            className="flex w-full h-auto border border-special p-6"
          >
            <CardContent className="relative flex flex-col sm:flex-row gap-8">
              <div className="w-full sm:w-[172px] p-3 h-[200px] sm:h-[138px] border-1 border-special rounded-md">
                <div
                  className={cn(
                    {
                      "bg-icons": !prod.image,
                      "bg-white-content": prod.image,
                    },
                    "flex justify-center items-center w-full h-full rounded-md"
                  )}
                  style={{
                    backgroundImage: prod.image
                      ? `url("${prod.image}")`
                      : "none",
                    backgroundSize: "70%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {!prod.image && (
                    <EmptyImage className="size-20 text-special" />
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-4">
                <CardTitle className="text-lg sm:text-[20px] font-medium text-icons flex justify-between">
                  {prod.name}
                </CardTitle>
                <div className="py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start text-sm">
                  {prod.category}
                </div>
                <CardFooter className="flex flex-col sm:flex-row justify-between p-0 text-2xl font-medium text-icons sm:gap-0 gap-4">
                  <div className="flex justify-between w-full text-lg sm:text-2xl">
                    <p className="block sm:hidden">Price:</p>
                    {currency.currentCurrency === "EUR"
                      ? `\u20AC${(currency.EUR * prod.price).toFixed(2)}`
                      : currency.currentCurrency === "GBP"
                      ? `\u00A3${(currency.GBP * prod.price).toFixed(2)}`
                      : `\u0024${(currency.USD * prod.price).toFixed(2)}`}
                  </div>
                  <div className="flex w-full justify-between items-center gap-6">
                    <Button
                      className={cn("flex gap-2 items-center", {
                        "text-success": prod.message,
                      })}
                      variant="default"
                      size="default"
                      onClick={() => setActiveNoteId(prod.stockId)}
                    >
                      {prod.message && (
                        <SnackbarInfo
                          variant="success"
                          className="w-5 h-5 bg-transparent"
                        />
                      )}
                      Write Note
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-3.5 w-[125px] h-[44px] border rounded-md border-special py-2.5 px-5">
                      <Button
                        variant="icon"
                        size="icon"
                        disabled={prod.quantity < 2}
                        className={cn("text-icons hover:text-highlights", {
                          "hover:text-icons": prod.quantity < 2,
                        })}
                        onClick={() => handleMinus(prod.stockId)}
                      >
                        <Minus className="w-6 h-6" />
                      </Button>
                      <p className="text-sm font-medium">{prod.quantity}</p>
                      <Button
                        variant="icon"
                        size="icon"
                        disabled={
                          typeof prod?.totalAmount === "number" &&
                          prod.quantity >= prod.totalAmount
                        }
                        className={cn("text-icons hover:text-highlights ", {
                          "hover:text-icons":
                            typeof prod?.totalAmount === "number" &&
                            prod.quantity >= prod.totalAmount,
                        })}
                        onClick={() => handlePlus(prod.stockId)}
                      >
                        <Plus className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
                {typeof prod?.totalAmount === "number" &&
                  prod.quantity >= prod.totalAmount && (
                    <CardFooter className="self-end text-sm text-error">
                      You&apos;ve reached the limit of available products.
                    </CardFooter>
                  )}
              </div>
              {activeNoteId === prod.stockId && (
                <div className="  absolute flex justify-end w-[60%] h-full left-[50%] translate-x-[-50%] text-icons">
                  <Button
                    variant="icon"
                    size="icon"
                    className="absolute rounded-md text-errorIcon hover:text-error"
                    onClick={() => handleMessagesFromClient(prod.stockId)}
                  >
                    <Exit className="h-6 w-6"></Exit>
                  </Button>
                  <Textarea
                    onChange={(event) => setNote(event.target.value)}
                    placeholder={`${
                      prod.message ||
                      "Do you have any additional information regarding your order?"
                    }`}
                    className="  w-full h-full py-3 px-6 rounded-md bg-info text-icons"
                  />
                </div>
              )}
            </CardContent>
            <Separator className="my-6" />
            <CardContent className="flex gap-4 items-start">
              <Checkbox
                id="protection"
                isChecked={prod?.productProtection === true}
                onClick={() => handleProtection(prod.stockId)}
              />
              <div className="flex flex-col text-icons font-medium w-full  gap-1">
                <div className="flex justify-between ">
                  <CardTitle className="text-first-content">
                    Product Protection
                  </CardTitle>
                  <p>
                    {currency.currentCurrency === "EUR"
                      ? `\u0024${(
                          currency.EUR *
                          prod.price *
                          0.02 *
                          prod.quantity
                        ).toFixed(2)}`
                      : currency.currentCurrency === "GBP"
                      ? `\u00A3${(
                          currency.GBP *
                          prod.price *
                          0.02 *
                          prod.quantity
                        ).toFixed(2)}`
                      : `\u20AC${(
                          currency.EUR *
                          prod.price *
                          0.02 *
                          prod.quantity
                        ).toFixed(2)}`}
                  </p>
                </div>
                <CardDescription className="font-normal">
                  The claim process is easy and instant, valid for 6 months
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CheckoutProductCard;
