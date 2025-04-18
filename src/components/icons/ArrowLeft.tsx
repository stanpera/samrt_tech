interface ArrowLeftProps {
  className?: string;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`lucide lucide-chevron-left-icon lucide-chevron-left ${className}`}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export default ArrowLeft;
