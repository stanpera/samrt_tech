"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import CartAndUserMenuAvatar from "./CartAndUserMenuAvatar";
import Logo from "../ui/Logo";

const Header = () => {
  const { status } = useSession();

  return (
    <header className="flex w-full max-w-[1440px]">
      <div className="w-full flex flex-col px-2 py-3 sm:py-8 sm:px-10 gap-5 sm:gap-10">
        <div className="flex justify-between items-center">
          <Link href="/" passHref>
            <Logo />
          </Link>
          {status === "authenticated" && <CartAndUserMenuAvatar />}
          {status === "unauthenticated" && (
            <Link
              className="py-2 sm:py-3.5 px-3 sm:px-5 bg-first-content text-background rounded-md hover:bg-highlights font-medium flex items-center"
              href="/login"
              passHref
            >
              Sign In
            </Link>
          )}
        </div>
        {status === "authenticated" && (
          <NavigationMenu className="flex justify-center sm:justify-start w-full sm:w-auto sm:flex-none gap-2 sm:gap-10">
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
      </div>
    </header>
  );
};

export default Header;
