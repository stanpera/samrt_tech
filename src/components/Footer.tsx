import ApplePay from "./icons/ApplePay";
import GooglePay from "./icons/GooglePay";
import MasterCard from "./icons/MasterCard";
import PayPal from "./icons/PayPal";
import Visa from "./icons/Visa";
import Logo from "./ui/logo";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center w-full h-[494px] bg-cards py-35 px-15">
      <div className="flex flex-col gap-6 items-start h-full">
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
      <div className="flex gap-2 text-second-content">
        <div className="flex flex-col gap-8 w-[191px]">
          <h3 className="text-xl font-semibold text-first-content">Company</h3>
          <ul className="flex flex-col gap-4">
            <li>About US</li>
            <li>Contact</li>
            <li>Partner</li>
          </ul>
        </div>
        <div className="flex flex-col gap-8 w-[191px]">
          <h3 className="text-xl font-semibold text-first-content">Social</h3>
          <ul className="flex flex-col gap-4">
            <li>Instagram US</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Linkedin</li>
          </ul>
        </div>
        <div className="flex flex-col gap-8 w-[191px]">
          <h3 className="text-xl font-semibold text-first-content">FAQ</h3>
          <ul className="flex flex-col gap-4">
            <li>Account</li>
            <li>Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
        <div className="flex flex-col gap-8 w-[191px]">
          <h3 className="text-xl font-semibold text-first-content">Resources</h3>
          <ul className="flex flex-col gap-4">
            <li>E-books</li>
            <li>Tutorials</li>
            <li>Course</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
