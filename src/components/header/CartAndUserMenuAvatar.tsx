"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShoppingCard from "../icons/ShoppingCard";
import DefaultAvatar from "../icons/DefaultAvatar";
import UserMenu from "./UserMenu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useUser from "@/hooks/useUser";

const CartAndUserMenuAvatar = () => {
  const { user, loading, error } = useUser("?userData=avatarUrl");

  const [isUserPanelVisible, setIsUserPanelVisible] = useState(false);

  const handleUserMenu = () => {
    setIsUserPanelVisible((prev) => !prev);
  };
  return (
    <div className="relative flex items-center gap-7">
      <Link href="/cart" passHref>
        <ShoppingCard
          className={cn("text-first-content hover:text-highlights w-6 h-6")}
        />
      </Link>
      <Avatar
        className={cn("relative cursor-pointer hover:opacity-80 duration-300")}
        onClick={handleUserMenu}
      >
        {user?.avatarUrl && (
          <AvatarImage src={`${user?.avatarUrl}`} alt="avatar" className="" />
        )}
        <AvatarFallback>
          {!user?.avatarUrl || (loading && error && <DefaultAvatar />)}
        </AvatarFallback>
      </Avatar>
      <UserMenu isUserPanelVisible={isUserPanelVisible} />
    </div>
  );
};

export default CartAndUserMenuAvatar;
