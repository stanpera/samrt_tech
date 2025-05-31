import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <main className="flex flex-col items-center w-full h-full max-w-[1440px] ">
      <LoadingSpinner/>
    </main>
  );
}