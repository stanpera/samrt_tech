"use client";

import { useState } from "react";
import EmptyImage from "./icons/EmptyImage";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import Trash from "./icons/Trash";
import { Separator } from "./ui/separator";
import Plus from "./icons/Plus";
import Minus from "./icons/Minus";

const CartProduct = () => {
  const [productsAmount, setProductsAmount] = useState<number>(0);
  const loading = false;

  const handlePlus = () => {
    setProductsAmount((prev) => prev + 1);
  };
  const handleMinus = () => {
    setProductsAmount((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="flex flex-col items-start gap-8 ">
      <div className="flex items-center gap-4">
        <Checkbox id="selectAll" />
        <label
          htmlFor="selectAll"
          className="font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select All
        </label>
      </div>
      {!loading &&
        Array.from({ length: 4 }).map((_, index) => (
          <div className="flex items-center gap-6">
            <Checkbox id={index} />
            <Card
              key={index}
              className="flex w-[839px] h-[186px] border border-special p-6"
            >
              <CardContent className="flex gap-8">
                <div className="w-[172px] p-3 h-[138px] border-1 border-special rounded-md">
                  <div
                    className={cn(
                      // {
                      //   "bg-icons":
                      //     !recProd.images || recProd.images.length === 0,
                      //   "bg-white-content":
                      //     Array.isArray(recProd.images) &&
                      //     recProd.images.length > 0,
                      // },
                      "justify-center items-center w-full h-full rounded-md bg-white-content"
                    )}
                    style={{
                      backgroundImage: `url("https://i.ibb.co/SwpBt0wS/razer-naga-v2-pro-1.png")`,
                      // recProd.images &&
                      // recProd.images.length > 0 &&
                      // recProd.images[0].url
                      //   ? `url("${recProd.images[0].url}")`
                      //   : "none",
                      backgroundSize: "80%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* {(!recProd.images || recProd.images.length === 0) && (
                    <EmptyImage className="size-30 text-special" />
                  )} */}
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <CardTitle className="text-lg text-icons flex justify-between">
                    {/* {recProd.name} */} Razer Naga V2 Pro
                    <Button
                      variant="trash"
                      size="trash"
                      className="top-2 left-2 hover:bg-none"
                    >
                      <Trash className="w-7.5 hover:text-errorIcon" />
                    </Button>
                  </CardTitle>
                  <div className="py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start text-sm">
                    {/* {recProd.category?.name} */} Gaming Mouse
                  </div>
                  <CardFooter className="flex justify-between p-0 text-2xl font-medium text-icons">
                    <div>
                      {/* {`\u20AC${recProd.price.toFixed(
                  2
                )}`} */}
                      €99.99
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-base">Write Note</p>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-3.5 w-[125px] h-[44px] border rounded-md border-special py-2.5 px-5">
                        <Button
                          variant="icon"
                          size="icon"
                          onClick={handleMinus}
                        >
                          <Minus className="w-6 h-6 text-icons hover:text-highlights" />
                        </Button>
                        <p className="text-sm font-medium">{productsAmount}</p>
                        <Button variant="icon" size="icon" onClick={handlePlus}>
                          <Plus className="w-6 h-6 text-icons hover:text-highlights" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
    </section>
  );
};

export default CartProduct;
