import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      default: "h-20 w-20",
      sm: "h-10 w-10",
      lg: "h-30 w-30",
    },
  },
});

interface IconProps extends VariantProps<typeof iconVariants> {
  className?: string;
  asChild?: boolean;
}

const Monitor: React.FC<IconProps> = ({
  className,
  size = "default",
  asChild = false,
  ...props
}) => {
  const Component = asChild ? "span" : "svg";
  return (
    <Component
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      className={cn(iconVariants({ size, className }))}
      {...props}
    >
      <path
        fill="currentColor"
        d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"
      />
    </Component>
  );
};

export default Monitor;
