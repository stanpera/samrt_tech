"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/SnackbarContext";

const UserMenu = ({ isUserPanelVisible }: { isUserPanelVisible: boolean }) => {
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

  return (
    <>
      {isUserPanelVisible && (
        <div className="flex flex-col w-full absolute top-[100%] text-icons mt-2 gap-1">
          <Link
            href="/user-profile"
            passHref
            className="hover:text-highlights cursor-pointer bg-cards w-full text-right p-1 rounded-md hover:scale-105 duration-300"
          >
            Profile
          </Link>
          <Button
            className="bg-cards w-full text-right p-1 rounded-md text-icons hover:scale-105"
            variant="default"
            size="default"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
