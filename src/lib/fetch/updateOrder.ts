type Snackbar = (
  message: string,
  variant: "success" | "error" | "warning" | "info"
) => void;

export async function updateOrder(orderId: number, showSnackbar: Snackbar) {
  try {
    const response = await fetch(`/api/orders/paid?orderId=${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
        "An unexpected error occurred while accepting your order.",
        "error"
      );
    }
  }
}
