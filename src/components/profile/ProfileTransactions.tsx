"use client";

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import Bag from "../icons/Bag";

const ProfileTransactions = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="w-[50%] mb-8">
        <h3 className="text-lg font-semibold mb-3 text-center">Transactions</h3>
        <Separator className="border-2" />
      </div>
      <div className="flex flex-col gap-4">
        <Card className="flex flex-row gap-4 p-4 border border-special text-icons">
          <Bag />
          <div className="flex flex-col gap-3.5">
            <CardDescription className="text-base">
              2022-09-24 18:31
            </CardDescription>
            <CardContent className="text-lg font-medium">
              <CardTitle>Your order nr INV/208421205/TSR/3385-B54</CardTitle>
              <CardTitle>
                <ul>
                  <li>&bull; Rexus Xierra X16</li>
                </ul>
              </CardTitle>
            </CardContent>
          </div>
        </Card>
        <Card className="flex flex-row gap-4 p-4 border border-special text-icons">
          <Bag />
          <div className="flex flex-col gap-3.5">
            <CardDescription className="text-base">
              2022-09-24 18:31
            </CardDescription>
            <CardContent className="text-lg font-medium">
              <CardTitle>Your order nr INV/208421205/TSR/3385-B54</CardTitle>
              <CardTitle>
                <ul>
                  <li>&bull; Rexus Xierra X16</li>
                </ul>
              </CardTitle>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTransactions;
