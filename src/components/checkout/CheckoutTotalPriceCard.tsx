"use client";

import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/SnackbarContext";
import { updateShippingAddress } from "@/lib/fetch/updateShippingAddress";
import { updateStock } from "@/lib/fetch/updateStock";
import { postOrder } from "@/lib/fetch/postOrder";

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
  productProtection: boolean;
  paymentMethod: string;
  shippingMethod: string;
}

interface AddressUpdateProps {
  country: string;
  street: string;
  postCode: string;
  city: string;
  state: string;
}

interface CurrentCurrencyProps {
  EUR: number;
  GBP: number;
  USD: number;
  currentCurrency: string;
}

interface CheckoutTotalPriceCardProps {
  refresh: boolean;
}
const CheckoutTotalPriceCard: React.FC<CheckoutTotalPriceCardProps> = ({
  refresh,
}) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  const [totalProductProtection, setTotalProductProtection] =
    useState<number>(0);
  const [shippingInsurance, setShippingInsurance] = useState<number>(0);
  const [serviceFees, setServiceFees] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);

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
        setTotalProductProtection(
          parsedItems
            .map((msg) =>
              msg?.productProtection ? msg.quantity * msg.price * 0.02 : 0
            )
            ?.reduce((acc, num) => acc + num, 0)
        );
        setShippingInsurance(
          parsedItems
            .map((msg) => msg.quantity * msg.price * 0.01)
            ?.reduce((acc, num) => acc + num, 0)
        );
        setServiceFees(
          parsedItems
            .map((msg) => msg.quantity * msg.price * 0.005)
            ?.reduce((acc, num) => acc + num, 0)
        );
        setGrandTotal(
          totalProductPrice +
            totalProductProtection +
            shippingInsurance +
            serviceFees
        );
      }
    }
    if (currentCurrency) {
      const parsedItems: CurrentCurrencyProps = JSON.parse(currentCurrency);
      setCurrency(parsedItems);
    }
  }, [
    serviceFees,
    shippingInsurance,
    totalProductPrice,
    totalProductProtection,
    refresh,
    setServiceFees,
    setShippingInsurance,
    setTotalProductProtection,
  ]);

  const handlePayNow = async () => {
    try {
      const paymentMethodItem = localStorage.getItem("paymentMethod");
      const shippingItem = localStorage.getItem("shipping");

      const productsOrder = cartProducts?.map((p) => ({
        stockId: p.stockId,
        productId: p.productId,
        quantity: p.quantity,
        message: p.message ?? "",
        productProtection: p.productProtection,
        paymentMethod: paymentMethodItem ?? "",
        shippingMethod: shippingItem ?? "",
      }));

      const orderId = await postOrder(productsOrder, showSnackbar);

      localStorage.setItem("orderId", orderId);

      const productsAmount = cartProducts?.map((p) => ({
        stockId: p.stockId,
        quantity: p.quantity,
      }));

      await updateStock(productsAmount, showSnackbar);

      const addressItem = localStorage.getItem("address");
      if (addressItem) {
        const parsedAddress: AddressUpdateProps = JSON.parse(addressItem);

        await updateShippingAddress(parsedAddress, showSnackbar);
        localStorage.removeItem("address");
      }
      localStorage.removeItem("cartItems");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("shipping");
      router.push(`/checkout/success/${orderId}`);
    } catch {
      return;
    }
  };

  return (
    <Card className="self-start w-full h-auto border border-special p-6 font-medium text-icons">
      <CardTitle className="text-lg mb-4 text-highlights">
        Total Product
      </CardTitle>
      <CardDescription className="flex flex-col justify-between gap-4">
        <div className="flex justify-between text-base">
          <p>
            Total Product Price (
            {cartProducts
              .map((p) => p.quantity)
              .reduce((acc, val) => acc + val, 0)}
            Items)
          </p>
          <p className="text-lg">
            {currency.currentCurrency === "EUR"
              ? `\u20AC${(currency.EUR * totalProductPrice).toFixed(2)}`
              : currency.currentCurrency === "GBP"
              ? `\u00A3${(currency.GBP * totalProductPrice).toFixed(2)}`
              : `\u0024${(currency.USD * totalProductPrice).toFixed(2)}`}
          </p>
        </div>
        <div className="flex justify-between text-base">
          <p>Total Product Protection</p>
          <p className="text-lg">
            {currency.currentCurrency === "EUR"
              ? `\u20AC${(currency.EUR * totalProductProtection).toFixed(2)}`
              : currency.currentCurrency === "GBP"
              ? `\u00A3${(currency.GBP * totalProductProtection).toFixed(2)}`
              : `\u0024${(currency.USD * totalProductProtection).toFixed(2)}`}
          </p>
        </div>
        <div className="flex justify-between text-base">
          <p>Total Shipping Price</p>
          <p className="text-lg">
            {currency.currentCurrency === "EUR"
              ? `\u20AC${(currency.EUR * shippingInsurance).toFixed(2)}`
              : currency.currentCurrency === "GBP"
              ? `\u00A3${(currency.GBP * shippingInsurance).toFixed(2)}`
              : `\u0024${(currency.USD * shippingInsurance).toFixed(2)}`}
          </p>
        </div>
        <div className="flex justify-between text-base">
          <p>Shipping Insurance</p>
          <p className="text-lg">
            {currency.currentCurrency === "EUR"
              ? `\u20AC${(currency.EUR * shippingInsurance).toFixed(2)}`
              : currency.currentCurrency === "GBP"
              ? `\u00A3${(currency.GBP * shippingInsurance).toFixed(2)}`
              : `\u0024${(currency.USD * shippingInsurance).toFixed(2)}`}
          </p>
        </div>
      </CardDescription>
      <Separator orientation="horizontal" className="h-[1px] bg-special my-4" />
      <CardTitle className="text-lg mb-4 text-highlights">
        Transaction Fees
      </CardTitle>
      <div className="flex justify-between text-base">
        <p>Service Fees</p>
        <p className="text-lg">
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * serviceFees).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * serviceFees).toFixed(2)}`
            : `\u0024${(currency.USD * serviceFees).toFixed(2)}`}
        </p>
      </div>
      <Separator orientation="horizontal" className="h-[1px] bg-special my-4" />
      <div className="flex justify-between text-base mt-4 mb-8">
        <p>Grand total</p>
        <p className="text-lg">
          {currency.currentCurrency === "EUR"
            ? `\u20AC${(currency.EUR * grandTotal).toFixed(2)}`
            : currency.currentCurrency === "GBP"
            ? `\u00A3${(currency.GBP * grandTotal).toFixed(2)}`
            : `\u0024${(currency.USD * grandTotal).toFixed(2)}`}
        </p>
      </div>
      <Button
        variant="form"
        size="form"
        disabled={!(totalProductPrice > 0) && true}
        onClick={handlePayNow}
      >
        Pay Now
      </Button>
    </Card>
  );
};

export default CheckoutTotalPriceCard;
