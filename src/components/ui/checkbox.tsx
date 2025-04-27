"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps 
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  id: string;
  name?: string;
  onChange?: (checked: boolean) => void;
  isChecked?: boolean;
}

const Checkbox = ({
  id,
  name,
  onChange,
  isChecked = false,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      id={id}
      name={name}
      checked={isChecked}
      onCheckedChange={onChange}
      className={cn(
        "peer h-6 w-6 shrink-0 rounded-[6px] border border-special bg-cards shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-highlights data-[state=checked]:border-highlights",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-4.5 text-cards" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export { Checkbox };
