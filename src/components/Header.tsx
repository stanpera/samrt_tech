import * as React from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ShoppingCard from "./icons/ShoppingCard";
import Logo from "./ui/Logo";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <header className="w-full flex flex-col py-8 px-10 gap-10">
      <div className="flex justify-between ">
        <Logo />
        <div className="flex items-center gap-7">
          <Link href="/cart" passHref>
          <ShoppingCard className="text-first-content hover:text-highlights w-6 h-6" />
          </Link>
          <Avatar className="cursor-pointer">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <NavigationMenu className=" gap-10">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/products-menu" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </header>
  );
};

export default Header;
