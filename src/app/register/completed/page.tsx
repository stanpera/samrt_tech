"use server"

import Check from "@/components/icons/Check";
import Link from "next/link";

const RegisterCompleted = () => {
  return (
    <main className="flex flex-col items-center my-5 sm:my-20 w-full max-w-[1440px] px-6 sm:px-0">
      <div className="flex flex-col items-center text-icons">
        <div className="flex items-center  justify-center w-10 h-10 sm:w-[75px] sm:h-[75px] rounded-[100%] border-3 text-first-content m-[12.5px]">
          <Check className="w-6 h-6 sm:w-[55 px] sm:h-[55px]" />
        </div>
        <p className="text-3xl sm:text-[44px] font-bold mb-2 mt-4 sm:mb-4 sm:mt-8">
          Thank you!
        </p>
        <p className="text:xl sm:text-2xl font-medium">
          You have succesfully register
        </p>
        <p className="text-base text-center sm:text-lg mb-[19px] mt-8">
          Please check your e-mail for further information. Let’s exploring our
          products and enjoy many gifts.
        </p>
        <p className="text-base text-center sm:text-lg">
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
