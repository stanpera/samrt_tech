
interface StockType {
  stockId: number;
  quantity: number;
}
type Snackbar = (
  message: string,
  variant: "success" | "error" | "warning" | "info"
) => void;

export async function updateStock(
  productsAmount: StockType[],
  showSnackbar: Snackbar
) {
  try {
    const response = await fetch(`/api/stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsAmount),
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
        "An unexpected error occurred while updating stock.",
        "error"
      );
    }
  }
}
