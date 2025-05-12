
interface OrderItemType {
  stockId: number;
  productId: number;
  quantity: number;
  message: string;
  productProtection: boolean;
  paymentMethod: string;
  shippingMethod: string;
}
type Snackbar = (
  message: string,
  variant: "success" | "error" | "warning" | "info"
) => void;

export async function postOrder(
  products: OrderItemType[],
  showSnackbar: Snackbar
) {
  try {
    const response = await fetch(`/api//orderItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();

    showSnackbar(data.message, "success");
  } catch (error: unknown) {
    if (error instanceof Error) {
      {
        showSnackbar(error.message, "error");
      }
    } else {
      showSnackbar(
        "An unexpected error occurred while paying for your order.",
        "error"
      );
    }
  }
}
