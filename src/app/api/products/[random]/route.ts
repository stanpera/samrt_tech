"use server";
import { NextResponse } from "next/server";
import { getRandomProductsFromDb } from "@/lib/queries";


export async function GET() {
  try {

    const randomProducts = await getRandomProductsFromDb();
    return NextResponse.json(randomProducts);
  } catch (error: unknown) {
    {
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
