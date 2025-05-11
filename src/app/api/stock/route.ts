"use server";
import { getStockProducts } from "@/lib/queries";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    const stockId = searchParams.get("stockId");

    if (stockId === "null") {
      return NextResponse.json({ status: 200 });
    }

    const values: string[] = ["id"];

    const amount = searchParams.get("amount");

    if (amount && amount !== "amount") {
      return NextResponse.json({ status: 200 });
    } else if (amount) {
      values.push(amount);
    }

    const product = searchParams.get("product");

    if (product && product !== "product") {
      return NextResponse.json({ status: 200 });
    } else if (product) {
      values.push("product");
    }

    console.log("product", product);

    if (stockId !== null) {
      const stockIdNumbers: Array<number> = stockId
        .split(",")
        .map((id) => Number(id));

      const stockProduct = await getStockProducts(stockIdNumbers, values);
      return NextResponse.json(stockProduct);
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
          error:
            "Error retrieving stock products data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
