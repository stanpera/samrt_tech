import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        " flex h-6 w-6 bg-error text-base",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
