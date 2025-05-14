import { cn } from "@/lib/utils";
import { IconProps } from "@/types";

const FullArrowRight: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={cn("size-4 sm:size-6", className)}
    >
      <path
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

export default FullArrowRight;
