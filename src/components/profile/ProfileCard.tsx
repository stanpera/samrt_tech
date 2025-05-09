"use client";

import { Card, CardFooter, CardTitle } from "../ui/card";
import DefaultAvatar from "../icons/DefaultAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useSnackbar } from "@/context/SnackbarContext";
import { useRouter } from "next/navigation";

interface AvatarProps {
  avatar: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}
const ProfileCard: React.FC<AvatarProps> = ({
  avatar,
  firstName,
  lastName,
  email,
}) => {
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
    <Card className="flex flex-col w-[320px] p-6 gap-6 border border-special self-start">
      <div className="flex justify-center items-center gap-6">
        <Avatar className={cn("w-[72px] h-[72px] relative", {})}>
          {avatar && <AvatarImage src={`${avatar}`} alt="avatar" />}
          {!avatar && (
            <AvatarFallback>
              <DefaultAvatar className="w-[72px] h-[72px]" />
            </AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="flex flex-col gap-1 text-icons">
          {!firstName && !lastName && <p>user</p>}
          <p>
            {firstName || ""} {lastName || ""}
          </p>
          {email && <p>{email}</p>}
        </CardTitle>
      </div>
      <Separator />
      <CardFooter className="flex justify-between">
        <Button variant="default" size="default" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="default" size="default" onClick={handleProfileEdit}>
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
