import { authOptions } from "@/lib/authOptions";
import { updateUser } from "@/lib/queries";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.IMGBB_KEY;

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const activeUserId = Number(session?.user.id);

    if (!activeUserId) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const { imageBase64 } = await req.json();

    const response = await fetch(
      `https://api.imgbb.com/1/upload?expiration=0&key=${API_KEY}&folder=user_avatars`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          image: imageBase64,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "An error occurred while uploading avatar.",
        },
        { status: 403 }
      );
    } else {
      const data = await response.json();

      await updateUser(activeUserId, { avatarUrl: data?.data.url });
      console.log("hhh", data.data.url);

      return NextResponse.json(
        { message: "Image loaded successfully" },
        { status: 200 }
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
          error: "Unexpected error while loading image.",
        },
        { status: 500 }
      );
    }
  }
}
