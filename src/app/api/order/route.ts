import { getOrder, getProducts } from "@/lib/queries";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    const orderId = Number(searchParams.get("id"));

    if (orderId === null || NaN) {
      return NextResponse.json({ status: 200 });
    }

    const userOrder = await getOrder(orderId);
    const productsIds = userOrder?.orderItems?.map((item) => item.productId);

    if (productsIds) {
      const products = await getProducts(productsIds, [
        "price",
        "name",
        "category",
        "images"
      ]);
      return NextResponse.json({ ...userOrder, products });
    } else {
      return NextResponse.json(userOrder);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Error retrieving order data.",
        },
        { status: 500 }
      );
    }
  }
}
