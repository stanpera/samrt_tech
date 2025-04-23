import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";

const TotalProduct = () => {
  return (
    <Card className="w-[423px] h-[294px] border border-special p-6 m-0 font-medium text-icons">
      <CardTitle className="text-lg mb-4 text-highlights">Total Product</CardTitle>
      <CardDescription className="flex justify-between">
        <div className="text-base">Total Product Price (10 Item)</div>
        <div className="text-lg">$259.9</div>
      </CardDescription>
      <Separator orientation="horizontal" className="h-[1px] bg-special my-5" />
      <CardFooter className="flex justify-between p-0 mb-8">
        <div className="text-lg">Subtotal</div>
        <div className="text-[28px]">$259.9</div>
      </CardFooter>
      <Button>Checkout</Button>
    </Card>
  );
};

export default TotalProduct;
