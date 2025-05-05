import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("disabled:opacity-50 duration-300 cursor-pointer", {
  variants: {
    variant: {
      default: "text-first-content hover:text-highlights cursor-pointer",
      destructive:
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border border-first-content rounded-md bg-none hover:bg-highlights hover:text-cards hover:border-transparent",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-higlights hover:text-higlights dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline hover:text-highlights ",
      banner: "bg-first-content hover:bg-highlights text-background",
      dot: "bg-special rounded-full",
      seeAll: "border-none bg-none hover:text-highlights ",
      shop: "bg-cards hover:bg-second-content",
      trash: "bg-none hover:bg-none",
      icon: "bg-none hover:bg-none",
      form: "bg-first-content text-cards font-medium hover:bg-highlights duration-300 rounded-md",
    },
    size: {
      default: "text-base font-normal",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      outline: "py-3.5 px-5",
      seeAll: "w-[91px] h-[26px]",
      banner: "w-11 h-[74px]",
      icon: "w-auto h-auto p-0",
      dot: "w-3 h-3",
      shop: "w-8 h-8 p-1 rounded-md",
      trash: "w-7.5 h-7.5 p-0",
      form: "w-full py-3.5 px-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
