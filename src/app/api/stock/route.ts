"use server";
import { getStockProducts } from "@/lib/queries";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, segmentData: { params: Params }) {
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

    let values: string[] = ["id"];
    const amount = searchParams.get("amount");

    if (amount !== "amount") {
      return NextResponse.json({ status: 200 });
    }

    values.push(amount);

    if (stockId !== null) {
      const stockIdNumbers: Array<number> = stockId
        .split(",")
        .map((id) => Number(id));

      const stockProduct = await getStockProducts(stockIdNumbers, values);
      return NextResponse.json(stockProduct);
    }
  } catch (error: unknown) {
    {
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
