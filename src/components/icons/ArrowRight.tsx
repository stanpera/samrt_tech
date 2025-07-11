import { IconProps } from "@/types";


const ArrowRight: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`lucide lucide-chevron-right-icon lucide-chevron-right ${className}`}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};

export default ArrowRight;
