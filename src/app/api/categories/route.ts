"use server";
import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/queries";

export async function GET() {
  try {
    const categories = await getAllCategories([
      "id",
      "name",
      "description",
      "image",
      "exploreInfo",
    ]);
    return NextResponse.json(categories);
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
            "Error retrieving product category data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
