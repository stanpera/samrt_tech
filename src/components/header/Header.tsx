"use client";

import * as React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ShoppingCard from "../icons/ShoppingCard";
import Logo from "../ui/Logo";
import { Separator } from "../ui/separator";
import DefaultAvatar from "../icons/DefaultAvatar";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import { useSnackbar } from "@/context/SnackbarContext";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isUserPanelVisible, setIsUserPanelVisible] = useState<boolean>(false);
  const { status } = useSession();
  const { showSnackbar } = useSnackbar();
  const pathname = usePathname(); // np. "/contact"
  console.log("pathname", pathname);

  const handleUserPanel = () => {
    if (status === "authenticated") {
      setIsUserPanelVisible((prev) => !prev);
    } else {
      setIsUserPanelVisible(false);
      showSnackbar("Please log in to proceed", "info");
    }
  };

  const handleSession = () => {
    if (status !== "authenticated") {
      showSnackbar("Please log in to proceed", "info");
    }
  };
  return (
    <header className="w-full flex flex-col py-8 px-10 gap-10">
      <div className="flex justify-between">
        <Link href="/" passHref onClick={handleSession}>
          <Logo />
        </Link>
        <div className="relative flex items-center gap-7">
          <Link href="/cart" passHref>
            <ShoppingCard
              className={cn(
                "text-first-content hover:text-highlights w-6 h-6",
                {
                  "hover:text-first-content opacity-50 cursor-auto":
                    status !== "authenticated",
                }
              )}
            />
          </Link>
          <Avatar
            className={cn(
              "relative cursor-pointer hover:opacity-80 duration-300",
              {
                "cursor-auto opacity-30 hover:opacity-30":
                  status !== "authenticated",
              }
            )}
            onClick={handleUserPanel}
          >
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback>
              <DefaultAvatar />
            </AvatarFallback>
          </Avatar>
          <UserMenu isUserPanelVisible={isUserPanelVisible} />
        </div>
      </div>
      <NavigationMenu className=" gap-10">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/"
              passHref
              className={cn(
                "hover:text-highlights duration-300 border-b-1 border-transparent hover:border-highlights",
                {
                  "text-highlights hover:border-transparent": pathname === "/",
                }
              )}
              onClick={handleSession}
            >
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/products-menu"
              passHref
              className={cn(
                "hover:text-highlights duration-300 border-b-1 border-transparent hover:border-highlights",
                {
                  "text-highlights hover:border-transparent":
                    pathname === "/products-menu",
                }
              )}
              onClick={handleSession}
            >
              Products
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/contact"
              passHref
              className={cn(
                "hover:text-highlights duration-300 border-b-1 border-transparent hover:border-highlights",
                {
                  "text-highlights hover:border-transparent":
                    pathname === "/contact",
                }
              )}
              onClick={handleSession}
            >
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </header>
  );
};

export default Header;
