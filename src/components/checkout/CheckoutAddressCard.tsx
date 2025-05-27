"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useState } from "react";
import MainAddress from "./MainAddress";
import useUser from "@/hooks/useUser";
import NewAddress from "./NewAddress";
import { Skeleton } from "../ui/skeleton";

type ActiveAddressType = "newAddress" | "existingAddress";

interface CheckoutAddressCardProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutAddressCard: React.FC<CheckoutAddressCardProps> = ({
  setRefresh,
}) => {
  const { user, error, errorMessage, loading } = useUser("?userData=address");

  const [activeAddress, setActiveAddress] =
    useState<ActiveAddressType>("existingAddress");

  const handleAddress = (address: ActiveAddressType) => {
    setActiveAddress(address);
  };

  if (loading) {
    return <Skeleton className="w-auto h-60" />;
  }

  if (error) {
    return (
      <Card className="w-auto h-60 flex items-center justify-center">
        <p className="text-icons">{errorMessage}</p>
      </Card>
    );
  }
  return (
    <section>
      <h3 className="text-2xl  font-medium mb-4 text-center sm:text-left">Address</h3>
      <div className="flex flex-col items-start gap-8 ">
        <Card className="flex w-full sm:w-[839px] h-auto border border-special p-6 gap-8">
          <div className="flex w-full">
            <Button
              id="existingAddress"
              variant="default"
              size="default"
              className={cn(
                "text-sm sm:text-lg font-semibold text-icons flex-1/2 pb-3 border-transparent border-b-1",
                {
                  "border-highlights text-highlights cursor-auto":
                    activeAddress === "existingAddress",
                }
              )}
              onClick={() => handleAddress("existingAddress")}
            >
              Existing Address
            </Button>
            <Button
              id="newAddress"
              variant="default"
              size="default"
              className={cn(
                "text-sm sm:text-lg  font-semibold text-icons flex-1/2 pb-3 border-b-1 border-transparent",
                {
                  "border-highlights text-highlights cursor-auto":
                    activeAddress === "newAddress",
                }
              )}
              onClick={() => handleAddress("newAddress")}
            >
              New Address
            </Button>
          </div>
          {activeAddress === "existingAddress" && (
            <MainAddress
              address={user?.address?.[0]}
              error={error}
              errorMessage={errorMessage}
              loading={loading}
              mobileNumber={user?.mobileNumber}
            />
          )}
          {activeAddress === "newAddress" && (
            <NewAddress
              setRefresh={setRefresh}
              address={user?.address?.[0]}
              mobileNumber={user?.mobileNumber}
            />
          )}
        </Card>
      </div>
    </section>
  );
};

export default CheckoutAddressCard;
