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
import { useSession } from "next-auth/react";
import { useSnackbar } from "@/context/SnackbarContext";
import { cn } from "@/lib/utils";
import CartAndUserMenuAvatar from "./CartAndUserMenuAvatar";
import { Button } from "../ui/button";

const Header = () => {
  const { status } = useSession();

  return (
    <header className="w-full flex flex-col py-8 px-10 gap-10">
      <div className="flex justify-between">
        <Link href="/" passHref>
          <Logo />
        </Link>
        {status === "authenticated" && <CartAndUserMenuAvatar />}
        {status !== "authenticated" && (
          <Link
            className="py-3.5 px-5 bg-first-content text-background rounded-md hover:bg-highlights font-medium"
            href="/login"
            passHref
          >
            Sign In
          </Link>
        )}
      </div>
      {status === "authenticated" && (
        <NavigationMenu className=" gap-10">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/"
                passHref
                className={cn(
                  "hover:text-highlights duration-300 border-b-1 border-transparent hover:border-highlights"
                )}
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/products-menu"
                passHref
                className={cn(
                  "hover:text-highlights duration-300 border-b-1 border-transparent hover:border-highlights"
                )}
              >
                Products
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/contact"
                passHref
                className={cn(
                  "hover:text-highlights duration-300 border-b-1 border-transparent hover:border-highlights"
                )}
              >
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      <Separator />
    </header>
  );
};

export default Header;
