import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
}
interface CurrentCurrencyProps {
  EUR: number;
  GBP: number;
  USD: number;
  currentCurrency: string;
}
interface TotalProductProps {
  refresh: boolean;
}

const TotalProduct: React.FC<TotalProductProps> = ({ refresh }) => {
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  const router = useRouter();

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
      if (
        parsedItems.length > 0 &&
        parsedItems !== undefined &&
        parsedItems !== null
      ) {
        setTotalProductPrice(
          parsedItems
            .map((msg) => msg.quantity * msg.price)
            ?.reduce((acc, num) => acc + num)
        );
      } else if (parsedItems.length === 0) {
        setTotalProductPrice(0);
      }
    }

    if (currentCurrency) {
      const parsedItems: CurrentCurrencyProps = JSON.parse(currentCurrency);
      setCurrency(parsedItems);
    }
  }, [refresh]);

  const handleCheckout = () => {
    if (totalProductPrice > 0) router.push("/checkout");
  };

  return (
    <Card className="w-[423px] h-auto border border-special p-6 m-0 font-medium text-icons">
      <CardTitle className="text-lg mb-4 text-highlights">
        Total Product
      </CardTitle>
      <CardDescription className="flex flex-col justify-between">
        {cartProducts.map((prod) => (
          <div key={prod.stockId} className="flex justify-between text-base">
            <p>{prod.name}</p>
            <p className="text-lg">
              {currency.currentCurrency === "EUR"
                ? `\u20AC${(currency.EUR * prod.price * prod.quantity).toFixed(
                    2
                  )}`
                : currency.currentCurrency === "GBP"
                ? `\u00A3${(currency.GBP * prod.price * prod.quantity).toFixed(
                    2
                  )}`
                : `\u0024${(currency.USD * prod.price * prod.quantity).toFixed(
                    2
                  )}`}
            </p>
          </div>
        ))}
      </CardDescription>
      <Separator orientation="horizontal" className="h-[1px] bg-special my-5" />
      <CardFooter className="flex justify-between p-0 mb-8">
        <div className="text-lg">Subtotal</div>
        <div className="text-[28px]">
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * totalProductPrice).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * totalProductPrice).toFixed(2)}`
            : `\u0024${(currency.USD * totalProductPrice).toFixed(2)}`}
        </div>
      </CardFooter>
      <Button
        variant="form"
        size="form"
        disabled={!(totalProductPrice > 0) && true}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </Card>
  );
};

export default TotalProduct;
