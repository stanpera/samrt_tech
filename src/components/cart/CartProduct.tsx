"use client";

import { useEffect, useState } from "react";
import EmptyImage from "../icons/EmptyImage";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import Trash from "../icons/Trash";
import { Separator } from "../ui/separator";
import Plus from "../icons/Plus";
import Minus from "../icons/Minus";
import { Textarea } from "../ui/textarea";
import Exit from "../icons/Exit";
import SnackbarInfo from "../icons/SnackbarIcon";

interface CartItemsProps {
  stockId: number;
  productId: number;
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
interface CartProductProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
const CartProduct: React.FC<CartProductProps> = ({ setRefresh }) => {
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");
  const [checkedProducts, setCheckedProducts] = useState<Array<number | "all">>(
    []
  );
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
      console.log("else", cartProducts[indexOfProduct]);

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

  const handleCheckProduct = (id: number | "all") => {
    if (typeof id === "number") {
      setCheckedProducts((prev) =>
        prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
      );
    } else if (id === "all") {
      setCheckedProducts((prev) => (prev.includes("all") ? [] : ["all"]));
    }
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

  const handleDeleteSingleProduct = (id: number) => {
    const indexOfProduct = cartProducts.findIndex((msg) => msg.stockId === id);

    const newCartProducts = cartProducts.filter(
      (_, index) => index !== indexOfProduct
    );

    localStorage.setItem("cartItems", JSON.stringify(newCartProducts));
    setlocalStorageRefresh((prev) => !prev);
  };

  const handleDeleteMultipleProduct = () => {
    if (checkedProducts.includes("all")) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    } else if (
      Array.isArray(checkedProducts) &&
      checkedProducts.length > 0 &&
      checkedProducts.every((el) => typeof el === "number")
    ) {
      const newCartProducts = cartProducts.filter(
        (prod) => !checkedProducts.includes(prod.stockId)
      );
      localStorage.setItem("cartItems", JSON.stringify(newCartProducts));
    }
    setlocalStorageRefresh((prev) => !prev);
  };

  if (cartProducts.length < 1) {
    return (
      <Card className="flex w-[839px] h-[186px] border border-special p-6 justify-center items-center">
        <CardTitle className="text-icons">No products in cart.</CardTitle>
      </Card>
    );
  }


  return (
    <section className="flex flex-col items-start gap-8 ">
      <div className="flex items-center gap-4 w-full h-6.5">
        <Checkbox
          id="selectAll"
          onClick={() => handleCheckProduct("all")}
          isChecked={checkedProducts[0] === "all"}
        />
        <label
          htmlFor="selectAll"
          className="font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select All
        </label>
        {checkedProducts.length > 0 && (
          <Button
            variant="trash"
            size="trash"
            className="flex items-center h-full"
            onClick={handleDeleteMultipleProduct}
          >
            <Trash />
          </Button>
        )}
      </div>
      {cartProducts.map((prod) => (
        <div key={prod.stockId} className="flex items-center gap-6">
          <Checkbox
            id={String(prod?.stockId)}
            onClick={() => handleCheckProduct(prod.stockId)}
            isChecked={
              checkedProducts.includes(prod.stockId) ||
              checkedProducts[0] === "all"
            }
          />
          <Card
            key={prod.stockId}
            className="flex w-[839px] h-auto border border-special p-6"
          >
            <CardContent className="relative flex gap-8">
              <div className="w-[172px] p-3 h-[138px] border-1 border-special rounded-md">
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
                <CardTitle className="text-[20px] font-medium text-icons flex justify-between">
                  {prod.name}
                  <Button
                    variant="trash"
                    size="trash"
                    onClick={() => handleDeleteSingleProduct(prod.stockId)}
                  >
                    <Trash />
                  </Button>
                </CardTitle>
                <div className="py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start text-sm">
                  {prod.category}
                </div>
                <CardFooter className="flex justify-between p-0 text-2xl font-medium text-icons">
                  <div>
                    {currency.currentCurrency === "EUR"
                      ? `\u20AC${(currency.EUR * prod.price).toFixed(2)}`
                      : currency.currentCurrency === "GBP"
                      ? `\u00A3${(currency.GBP * prod.price).toFixed(2)}`
                      : `\u0024${(currency.USD * prod.price).toFixed(2)}`}
                  </div>
                  <div className="flex items-center gap-6">
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
                        <Minus className="w-6 h-6 text-icons hover:text-highlights" />
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
                        <Plus className="w-6 h-6 text-icons hover:text-highlights" />
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
          </Card>
        </div>
      ))}
    </section>
  );
};

export default CartProduct;
