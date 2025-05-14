"use server";
import { NextRequest, NextResponse } from "next/server";
import { getRandomProductsFromDb } from "@/lib/queries";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const randomProducts = await getRandomProductsFromDb();

    return NextResponse.json(randomProducts);
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
            "Error retrieving recommended products data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
