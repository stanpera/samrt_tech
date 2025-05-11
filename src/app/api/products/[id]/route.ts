"use server";
import { NextRequest, NextResponse } from "next/server";
import { getSingleProduct } from "@/lib/queries";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params;
    const id = params.id;

    const product = await getSingleProduct(parseInt(id));
    return NextResponse.json(product);
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
          error: "Error retrieving specific products. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
