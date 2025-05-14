"use server";
import { hashPassword } from "@/lib/passwordHasher";
import { createAddress, createUser, getUser } from "@/lib/queries";
import { RegisterUserProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const { email, mobileNumber, password, country }: RegisterUserProps =
      await req.json();

    const passwordHash: string = await hashPassword(password);
    await createUser(email, passwordHash, mobileNumber);

    const userId = await getUser(email, ["id"]);

    if (userId?.id) {
      await createAddress(userId.id, country);
    }

    return NextResponse.json(
      { message: "User has been successfully registered" },
      { status: 200 }
    );
  } catch (error: unknown) {
    {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        return NextResponse.json(
          {
            error:
              "Unexpected error while submitting registration form. Please try again later.",
          },
          { status: 500 }
        );
      }
    }
  }
}
