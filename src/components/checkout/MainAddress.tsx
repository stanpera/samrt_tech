"use client"

import { Address } from "@/types";
import { CardContent } from "../ui/card";

interface AddressProps {
  address?: Address;
  mobileNumber?: String;
}

const MainAddress: React.FC<AddressProps> = ({ address, mobileNumber }) => {

  return (
    <CardContent className="flex flex-col gap-10">
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
      <div className="flex justify-between font-medium text-icons">
        <p className="flex flex-col">
          <span className="text-second-content">Country</span>
          <span className="text-lg">{address?.country}</span>
        </p>
        <p className="flex flex-col">
          <span className="text-second-content">Province</span>
          <span className="text-lg">{address?.state}</span>
        </p>
        <p className="flex flex-col">
          <span className="text-second-content">Phone Number</span>
          <span className="text-lg">+{mobileNumber}</span>
        </p>
        <p className="flex flex-col">
          <span className="text-second-content">Poste Code</span>
          <span className="text-lg">{address?.postalCode}</span>
        </p>
      </div>
    </CardContent>
  );
};

export default MainAddress;
