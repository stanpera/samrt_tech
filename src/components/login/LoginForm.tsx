"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useSnackbar } from "@/context/SnackbarContext";

import { Button } from "../ui/button";
import Logo from "../ui/Logo";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

const contactSchema = z.object({
  contact: z.string().min(4, {
    message: "This field must be filled in and have at least 4 characters",
  }),
});

const passwordSchema = z.object({
  password: z.string().min(4, { message: "This field has to be filled." }),
  savePassword: z.boolean(),
});

const LoginForm = () => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [contact, setContact] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const formContact = useForm<
    z.input<typeof contactSchema>,
    any,
    z.output<typeof contactSchema>
  >({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contact: "",
    },
  });

  const formPassword = useForm<
    z.input<typeof passwordSchema>,
    any,
    z.output<typeof passwordSchema>
  >({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      savePassword: false,
    },
  });

  const inputValue = formContact.watch("contact");

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValidEmail = emailRegex.test(inputValue);
  const cleanedNumber = inputValue.replace(/[\s_-]+/g, "");
  const isValidPhone = /^\+\d+$/.test(cleanedNumber);

  type proceedToPasswordProps = {
    contact: string;
  };

  const proceedToPassword = async (data: proceedToPasswordProps) => {
    setSubmitted(true);
    if (isValidEmail || isValidPhone) {
      setContact(data?.contact);
      setStep(2);
    }
  };

  type onSubmitProps = {
    password: string;
  };

  const onSubmit = async (value: onSubmitProps): Promise<any> => {
    try {
      let password = value.password;
      const singInToApp: any = await signIn("smarttech", {
        contact,
        password,
        redirect: false,
      });

      if (singInToApp) {
        showSnackbar("You have been successfully logged in.", "success");
        router.push("/");
      } else {
        showSnackbar(
          "Unexpected error when logging in. Please try again later or contact with support.",
          "error"
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar(error.message, "error");
      } else {
        showSnackbar(
          "Unexpected error when logging in. Please try again later",
          "error"
        );
      }
    }
  };
  return (
    <>
      <>
        {step === 1 && (
          <Form {...formContact}>
            <div className="mt-[77px] mb-8">
              <Logo />
            </div>
            <form
              onSubmit={formContact.handleSubmit(proceedToPassword)}
              className={cn(
                " flex flex-col mb-[77px] items-center text-icons bg-cards p-6 rounded-md border border-special w-[448px] gap-8"
              )}
            >
              <FormDescription className="self-start border-special border-b-1 w-full pb-5">
                Sign In{" "}
              </FormDescription>
              <FormField
                control={formContact.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email or Mobile Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Email or mobile phone number"
                        {...field}
                        className="py-3.5 px-5 h-13.5"
                      />
                    </FormControl>
                    <FormMessage
                      isCorrect={isValidPhone || isValidEmail}
                      isSubmited={submitted}
                      message={
                        (!isValidPhone && inputValue.startsWith("+")) ||
                        (!isValidPhone &&
                          inputValue.charAt(0) >= "0" &&
                          inputValue.charAt(0) <= "9")
                          ? "Invalid Mobile Number (type phone number with country code)"
                          : "Invalid Email"
                      }
                    />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="form" size="form">
                Continue
              </Button>
              <p>
                Don't have an account?
                <Link
                  className="font-medium text-highlights"
                  href={"/register"}
                  passHref
                >
                  Register
                </Link>
              </p>
            </form>
          </Form>
        )}
        {step === 2 && (
          <Form {...formPassword}>
            <div className="mt-[77px] mb-8">
              <Logo />
            </div>
            <form
              onSubmit={formPassword.handleSubmit(onSubmit)}
              className={cn(
                " flex flex-col mb-[77px] items-center text-icons bg-cards p-6 rounded-md border border-special w-[448px] gap-8"
              )}
            >
              <FormDescription className="self-start border-special border-b-1 w-full pb-5">
                Sign In{" "}
              </FormDescription>
              <FormField
                control={formPassword.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="py-3.5 px-5 h-13.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formPassword.control}
                name="savePassword"
                render={({ field }) => (
                  <FormItem className=" w-full ">
                    <div className="flex gap-4">
                      <FormControl>
                        <Checkbox
                          id="savePassword"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="flex justify-between m-0 text-sm w-full">
                        <div>Save password</div>
                        <div className="text-highlights">
                          Forgot your password?
                        </div>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="form" size="form">
                Sign In
              </Button>
            </form>
          </Form>
        )}
      </>
    </>
  );
};

export default LoginForm;
