
interface AddressUpdateProps {
  country: string;
  street: string;
  postCode: string;
  city: string;
  state: string;
}

type Snackbar = (
  message: string,
  variant: "success" | "error" | "warning" | "info"
) => void;

export async function updateShippingAddress(
  parsedAddress: AddressUpdateProps,
  showSnackbar: Snackbar
) {
  try {
    const response = await fetch(`/api/user/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedAddress),
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
        "An unexpected error occurred while updating address.",
        "error"
      );
    }
  }
}
