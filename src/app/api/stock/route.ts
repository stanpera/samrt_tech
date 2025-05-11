"use server";
import { authOptions } from "@/lib/authOptions";
import { getStockProducts, updateStock } from "@/lib/queries";
import { getServerSession } from "next-auth";
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
      values.push(product);
    }

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

interface UpdateStockType {
  stockId: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const data: UpdateStockType[] = await req.json();

    const stockIds = data.map((s) => s.stockId);
    const stockAmount = await getStockProducts(stockIds, ["id", "amount"]);

    const priceMap = new Map();
    stockAmount.forEach((a) => {
      priceMap.set(a.id, a.amount);
    });

    const quantityAndAmount = data.map((item) => ({
      ...item,
      amount: priceMap.get(item.stockId) ?? 0,
    }));

    const updatedAmounts: [number, number][] = quantityAndAmount.map((p) => [
      p.stockId,
      p.amount - p.quantity,
    ]);
    await updateStock(updatedAmounts);

    return NextResponse.json(
      {
        message: `Stock successfully updated`,
      },
      { status: 200 }
    );
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
          error: "Error updating stock.",
        },
        { status: 500 }
      );
    }
  }
}
