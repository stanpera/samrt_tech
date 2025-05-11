import Check from "@/components/icons/Check";
import Link from "next/link";

const RegisterCompleted = () => {
  return (
    <main className="flex flex-col items-center my-20">
      <div className="flex flex-col items-center text-icons">
        <div className="flex items-center  justify-center w-[75px] h-[75px] rounded-[100%] border-3 text-first-content m-[12.5px]">
          <Check className="w-[55 px] h-[55px]" />
        </div>
        <p className="text-[44px] font-bold mb-4 mt-8">Thank you!</p>
        <p className="text-2xl font-medium">You have succesfully register</p>
        <p className="text-lg mb-[19px] mt-8">
          Please check your e-mail for further information. Let’s exploring our
          products and enjoy many gifts.
        </p>
        <p className="text-lg">
          Having problem?{" "}
          <Link className="text-highlights" href="/contact">
            Contact us
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterCompleted;
