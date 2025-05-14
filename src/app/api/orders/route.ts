"use server";
import { NextRequest, NextResponse } from "next/server";
import { getOrders } from "@/lib/queries";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    const orderData = searchParams.get("ordersData");

    if (orderData === "orders") {
      const currentUserId: number = Number(token?.userId);
      const orders = await getOrders(currentUserId);
      return NextResponse.json(orders);
    } else {
      return NextResponse.json(
        { error: "No response from db while fetching orders data" },
        { status: 403 }
      );
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
          error: "An error occurred while retrieving orders data.",
        },
        { status: 500 }
      );
    }
  }
}
