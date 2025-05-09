"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import DefaultAvatar from "../icons/DefaultAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useSnackbar } from "@/context/SnackbarContext";
import { useRouter } from "next/navigation";
import Bag from "../icons/Bag";

const ProfileTransactions = () => {
  const router = useRouter();

  const { status } = useSession();

  const { showSnackbar } = useSnackbar();
  const handleLogout = async () => {
    try {
      await signOut();
      if (status === "unauthenticated") {
        showSnackbar("You have been successfully logged out.", "success");
        router.push("/login");
      } else {
        showSnackbar(
          "Something went wrong. Please try again later or contact with support.",
          "error"
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar(error.message, "error");
      } else {
        showSnackbar(
          "Unexpected error when logging out. Please try again later or contact with support.",
          "error"
        );
      }
    }
  };

  const handleProfileEdit = () => {
    router.push("/profile/edit");
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-[50%] mb-8">
        <h3 className="text-lg font-semibold mb-3 text-center">Transactions</h3>
        <Separator className="border-2" />
      </div>
      <div className="flex flex-col gap-4">
        <Card className="flex flex-row gap-4 p-4 border border-special text-icons">
          <Bag />
          <div className="flex flex-col gap-3.5">
            <CardDescription className="text-base">
              2022-09-24 18:31
            </CardDescription>
            <CardContent className="text-lg font-medium">
              <CardTitle>Your order nr INV/208421205/TSR/3385-B54</CardTitle>
              <CardTitle>
                <ul>
                  <li>&bull; Rexus Xierra X16</li>
                </ul>
              </CardTitle>
            </CardContent>
          </div>
        </Card>
        <Card className="flex flex-row gap-4 p-4 border border-special text-icons">
          <Bag />
          <div className="flex flex-col gap-3.5">
            <CardDescription className="text-base">
              2022-09-24 18:31
            </CardDescription>
            <CardContent className="text-lg font-medium">
              <CardTitle>Your order nr INV/208421205/TSR/3385-B54</CardTitle>
              <CardTitle>
                <ul>
                  <li>&bull; Rexus Xierra X16</li>
                </ul>
              </CardTitle>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTransactions;
