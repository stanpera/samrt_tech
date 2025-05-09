"use server";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { updateAddress } from "@/lib/queries";

// export async function GET() {
//   try {
//     const categories = await getUserAddress([
//       "id",
//       "name",
//       "description",
//       "image",
//       "exploreInfo",
//     ]);
//     return NextResponse.json(categories);
//   } catch (error: unknown) {
//     {
//       return NextResponse.json(
//         {
//           error:
//             "Error retrieving product category data. Please try again later.",
//         },
//         { status: 500 }
//       );
//     }
//   }
// }

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }
    const dataFromClient: { [key: string]: string } = await req.json();

    const validDataFromClient: { [key: string]: string } = Object.fromEntries(
      Object.entries(dataFromClient).filter(
        ([key, value]) => value != null && value !== "" && value != undefined
      )
    );
    if (validDataFromClient) {
      const currentUserId: number = Number(token?.userId);

      await updateAddress(currentUserId, validDataFromClient);
    }

    return NextResponse.json(
      {
        message: "Address data has been updated successfully.",
      },
      { status: 200 }
    );
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
          error: "Error updating address data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
