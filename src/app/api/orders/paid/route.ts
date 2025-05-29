"use server";
import { NextRequest, NextResponse } from "next/server";
import { updateOrder } from "@/lib/queries";
import { getToken } from "next-auth/jwt";

export async function PUT(req: NextRequest) {
  try {
    console.log("AAADDD");

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    const orderId = searchParams.get("orderId");

    if (orderId) {
      const id = Number(orderId);
      await updateOrder(id, { status: "paid" });
      return NextResponse.json({ message: "Order paid" }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No response from db while updating orders data" },
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
          error: "An error occurred while updating orders data.",
        },
        { status: 500 }
      );
    }
  }
}
