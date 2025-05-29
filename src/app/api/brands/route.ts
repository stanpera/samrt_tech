import { NextResponse } from "next/server";
import { getAllBrands } from "@/lib/queries";

export async function GET() {
  try {
    const brands = await getAllBrands();
    return NextResponse.json(brands);
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
          error: "Error retrieving brands list data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
