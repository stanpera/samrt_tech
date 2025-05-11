"use server";
import { NextRequest, NextResponse } from "next/server";
import { getUser, updateUser } from "@/lib/queries";
import { getToken } from "next-auth/jwt";
import { hashPassword } from "@/lib/passwordHasher";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    let values: string[] = [];

    const { searchParams } = new URL(req.url);

    const userData = searchParams.get("userData");

    if (userData === "editForm") {
      values = [
        "id",
        "firstName",
        "lastName",
        "email",
        "mobileNumber",
        "avatarUrl",
        "address",
      ];
    }

    if (userData === "profile") {
      values = [
        ...values,
        "id",
        "firstName",
        "lastName",
        "email",
        "avatarUrl",
        "orders",
      ];
    }
    if (userData === "avatarUrl") {
      values = [...values, "avatarUrl"];
    }
    
    if (userData === "address") {
      values = [...values, "address", "mobileNumber"];
    }

    const currentUserId: number = Number(token?.userId);

    const user = await getUser(currentUserId, values);
    return NextResponse.json(user);
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
          error: "An error occurred while retrieving user data.",
        },
        { status: 500 }
      );
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }
    const dataFromClient: { [key: string]: string } = await req.json();

    const validDataFromClient: { [key: string]: string } = Object.fromEntries(
      Object.entries(dataFromClient)
        .filter(
          ([, value]) => value != null && value !== "" && value != undefined
        )
        .map(([key, value]) => {
          if (key === "password") {
            return ["passwordHash", value];
          }
          return [key, value];
        })
    );
    console.log("validDataFromClient", validDataFromClient);
    if (validDataFromClient) {
      if (validDataFromClient.passwordHash) {
        validDataFromClient.passwordHash = await hashPassword(
          validDataFromClient.passwordHash
        );
      }

      const currentUserId: number = Number(token?.userId);

      await updateUser(currentUserId, validDataFromClient);
    }
    return NextResponse.json(
      {
        message: "User data has been updated successfully.",
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
          error: "Error updating user data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
