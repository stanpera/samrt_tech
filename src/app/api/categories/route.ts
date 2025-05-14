"use server";
import { NextRequest, NextResponse } from "next/server";
import { getAllCategories } from "@/lib/queries";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }
    const categories = await getAllCategories();
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
