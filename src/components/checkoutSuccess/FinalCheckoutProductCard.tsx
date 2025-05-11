import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";

const FinalCheckoutProductCard = () => {
  return (
    <Card className="flex w-[592px] h-auto border border-special p-4">
      <CardContent className="relative flex gap-8">
        <div className="w-[172px] p-3 h-[138px] border-1 border-special rounded-md">
          <div
            className={cn(
              {},
              "flex justify-center items-center w-full h-full rounded-md"
            )}
            style={{
              // backgroundImage: prod.image ? `url("${prod.image}")` : "none",
              backgroundSize: "70%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* {!prod.image && <EmptyImage className="size-20 text-special" />} */}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <CardTitle className="text-[20px] font-medium text-icons flex justify-between">
            dsad
          </CardTitle>
          <div className="py-1.5 px-2.5 bg-first-content text-cards rounded-md self-start text-sm">
            dsasad
          </div>
          <CardFooter className="flex justify-between p-0 text-2xl font-medium text-icons">
            <div>
              55PLN
              {/* {currency.currentCurrency === "EUR"
                  ? `\u0024${(currency.EUR * prod.price).toFixed(2)}`
                  : currency.currentCurrency === "GBP"
                  ? `\u00A3${(currency.GBP * prod.price).toFixed(2)}`
                  : `\u20AC${(currency.EUR * prod.price).toFixed(2)}`} */}
            </div>
            <div className="flex items-center gap-6"></div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalCheckoutProductCard;
