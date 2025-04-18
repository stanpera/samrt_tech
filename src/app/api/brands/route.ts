import { NextResponse } from "next/server";
import { getAllBrands } from "@/lib/queries";

export async function GET() {
  try {
    const brands = await getAllBrands(["id", "name", "logoUrl"]);
    console.log("AAAAAbrands", brands);
    return NextResponse.json(brands);
  } catch (error: unknown) {
    {
      return NextResponse.json(
        {
          error: "Error retrieving brands list data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
