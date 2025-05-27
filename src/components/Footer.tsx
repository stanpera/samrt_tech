import ApplePay from "./icons/ApplePay";
import GooglePay from "./icons/GooglePay";
import MasterCard from "./icons/MasterCard";
import PayPal from "./icons/PayPal";
import Visa from "./icons/Visa";
import Logo from "./ui/Logo";

const Footer = () => {
  return (
    <footer className="flex w-full h-[auto] sm:h-[494px] bg-cards justify-center">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full h-full max-w-[1440px] bg-cards py-10 sm:py-35 px-0 sm:px-15 gap-8 sm:gap-0">
        <div className="flex flex-col gap-1 sm:gap-6 items-center sm:items-start h-full mb-5 sm:mb-0">
          <Logo />
          <p className="text-second-content">
            © 2023 SmartTech. All rights reserved.
          </p>
          <div className="flex gap-3">
            <Visa className="h-8 text-icons" />
            <MasterCard className="h-8 text-icons" />
            <PayPal className="h-8 text-icons" />
            <ApplePay className="h-8 text-icons" />
            <GooglePay className="h-8 text-icons" />
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-x-10 gap-y-5 sm:gap-x-0 sm:gap-y-5 text-second-content justify-start px-4 sm:px-0 sm:justify-items-normal">
          <div className="flex flex-col gap-2 sm:gap-8 w-[auto] sm:w-[191px]">
            <h3 className="text-xl font-semibold text-first-content">
              Company
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-4">
              <li>About US</li>
              <li>Contact</li>
              <li>Partner</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 sm:gap-8 w-[auto] sm:w-[191px]">
            <h3 className="text-xl font-semibold text-first-content">Social</h3>
            <ul className="flex flex-col gap-4">
              <li>Instagram US</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Linkedin</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 sm:gap-8 w-[auto] sm:w-[191px]">
            <h3 className="text-xl font-semibold text-first-content">FAQ</h3>
            <ul className="flex flex-col gap-4">
              <li>Account</li>
              <li>Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 sm:gap-8 w-[auto] sm:w-[191px]">
            <h3 className="text-xl font-semibold text-first-content">
              Resources
            </h3>
            <ul className="flex flex-col gap-4">
              <li>E-books</li>
              <li>Tutorials</li>
              <li>Course</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
