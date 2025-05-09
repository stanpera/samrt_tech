"use server";
import { hashPassword } from "@/lib/passwordHasher";
import { createAddress, createUser, getUser } from "@/lib/queries";
import { RegisterUserProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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
