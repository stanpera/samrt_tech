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

const Webcam: React.FC<IconProps> = ({
  className,
  size = "default",
  asChild = false,
  ...props
}) => {
  const Component = asChild ? "span" : "svg";
  return (
    <Component
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn(iconVariants({ size, className }))}
      {...props}
    >
      <path
        fill="currentColor"
        d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
      />
    </Component>
  );
};

export default Webcam;
