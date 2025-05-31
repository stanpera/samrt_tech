"use client";

import { Address } from "@/types";
import { CardContent } from "../ui/card";

interface AddressProps {
  address?: Address;
  error: boolean;
  errorMessage: string;
  loading: boolean;
  mobileNumber?: string;
}

const MainAddress: React.FC<AddressProps> = ({ address, mobileNumber }) => {
  return (
    <CardContent className="flex flex-col gap-10">
      {address?.country &&
      address?.street &&
      address?.city &&
      address?.state &&
      address?.postalCode &&
      mobileNumber ? (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <h4 className="font-medium text-icons">Address</h4>
              <div className="rounded-md px-2.5 py-1.5 bg-first-content text-cards text-sm font-medium">
                Main Address
              </div>
            </div>
            <p className="text-icons font-medium">
              {address?.street}, {address?.city}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between font-medium text-icons">
            <p className="flex flex-row sm:flex-col justify-between">
              <span className="text-second-content">Country</span>
              <span className="text-lg">{address?.country}</span>
            </p>
            <p className="flex flex-row sm:flex-col justify-between">
              <span className="text-second-content">Province</span>
              <span className="text-lg">{address?.state}</span>
            </p>
            <p className="flex flex-row sm:flex-col justify-between">
              <span className="text-second-content">Phone Number</span>
              <span className="text-lg">+{mobileNumber}</span>
            </p>
            <p className="flex flex-row sm:flex-col justify-between">
              <span className="text-second-content">Post Code</span>
              <span className="text-lg">{address?.postalCode}</span>
            </p>
          </div>
        </>
      ) : (
        <div className="text-error">
          No address in memory. Click &quot;New Adress&quot; to provide a new shipping
          address and <b>STAY THERE.</b>
        </div>
      )}
    </CardContent>
  );
};

export default MainAddress;
