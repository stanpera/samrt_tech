import { cn } from "@/lib/utils";
import Check from "../icons/Check";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import FinalCheckoutProductCard from "./FinalCheckoutProductCard";
import { Button } from "../ui/button";

const CheckoutSuccessCard = () => {
  return (
    <Card className="h-auto border border-special p-6 font-medium text-icons gap-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center justify-center h-15 w-15 border-2 border-first-content rounded-[100%]">
          <Check className="h-[75%] w-[75%] text-first-content" />
        </div>
        <CardTitle className="text-[28px]">Thanks for Your Order!</CardTitle>
        <p className="text-highlights">Order number 231254135321</p>
      </div>
      <h5 className="text-lg text-first-content">Transaction Date</h5>
      <p>Wednesday, August 9, 2023</p>
      <Separator />
      <h5 className="text-lg text-first-content">Payment Method</h5>
      <p>Apple Pay</p>
      <Separator />
      <h5 className="text-lg text-first-content">Shipping Method</h5>
      <p>NexusHub Courier</p>
      <Separator />
      <h5 className="text-lg text-first-content">Your Order</h5>
      <FinalCheckoutProductCard />
      <Separator />
      <div className="flex justify-between items-center">
        <p>Total Product Price (10 Item)</p>
        <p className="text-lg">$259.9</p>
      </div>
      <div className="flex justify-between items-center">
        <p>Total Product Protection</p>
        <p className="text-lg">$1</p>
      </div>
      <div className="flex justify-between items-center">
        <p>Total Shipping Price</p>
        <p className="text-lg">$5</p>
      </div>
      <div className="flex justify-between items-center">
        <p>Shipping Insurance</p>
        <p className="text-lg">$6</p>
      </div>
      <Separator />
      <h5 className="text-lg text-first-content">Transaction Fees</h5>
      <div className="flex justify-between items-center">
        <p>Service Fees</p>
        <p className="text-lg">$0.5</p>
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <p className="text-lg text-first-content">Grand total</p>
        <p className="text-[28px]">$272.4</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg text-first-content">Statusl</p>
        <div
          className={cn(
            "text-sm px-2.5 py-1.5 bg-success rounded-md text-cards",
            {}
          )}
        >
          Success
        </div>
      </div>
      <Button variant="form" size="form" className="mt-6">
        Continue Shopping
      </Button>
    </Card>
  );
};

export default CheckoutSuccessCard;
