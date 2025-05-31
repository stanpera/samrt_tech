import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }
    const response = await fetch(
      `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${process.env.CURRENCY_API_KEY}&symbols=GBP,USD,EUR`
    );
    const data = await response.json();
    return NextResponse.json(data);
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
