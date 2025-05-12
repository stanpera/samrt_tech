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
import PhoneInput from "react-phone-input-2";

import { useSnackbar } from "@/context/SnackbarContext";

import { Button } from "../ui/button";
import Logo from "../ui/Lggo";
import { CountryDropdown } from "./SelectCountry";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

const formSchema = z
  .object({
    email: z
      .string()
      .min(3, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    mobileNumber: z
      .string()
      .min(4, { message: "Mobile number must contain at least 4 letter" }),
    password: z
      .string()
      .min(4, { message: "This field has to be filled." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
        message:
          "Password must contain at least 1 letter, 1 uppercase letter, 1 number and 1 special character",
      }),
    confirmPassword: z.string(),
    country: z.string().min(1, { message: "Required" }),
    agreement: z.literal(true, {
      message: "You must accept the agreement.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface formValue {
  email: string;
  mobileNumber: string;
  password: string;
  country: string;
}

const RegisterForm = () => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      country: "United States",
    },
  });

  const onSubmit = async (value: formValue): Promise<void> => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          mobileNumber: value.mobileNumber,
          password: value.password,
          country: value.country,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showSnackbar(data.message, "success");
        router.push("/register/completed");
      } else {
        showSnackbar(data.error, "error");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar(error.message, "error");
      } else {
        showSnackbar(
          "Unexpected error during registration. Please try again later",
          "error"
        );
      }
    }
  };
  return (
    <>
      <Form {...form}>
        <div className="mt-[77px] mb-8">
          <Logo />
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            " flex flex-col mb-[77px] items-center text-icons bg-cards p-6 rounded-md border border-special w-[448px] gap-8"
          )}
        >
          <FormDescription className="self-start border-special border-b-1 w-full pb-5">
            Create Account
          </FormDescription>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Email"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <FormLabel>Mobile Number</FormLabel>
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <PhoneInput
                      inputStyle={{
                        width: "100%",
                        height: "54px",
                      }}
                      country={"us"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
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
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country or Region</FormLabel>
                <CountryDropdown
                  defaultValue={field.value}
                  onChange={(country) => {
                    field.onChange(country.name);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreement"
            render={({ field }) => (
              <FormItem className=" w-full ">
                <div className="flex gap-4 items-center">
                  <FormControl>
                    <Checkbox
                      id="agreement"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="block text-sm m-0">
                    By creating an account and check, you agree to the
                    <strong className="text-highlights">
                      {" "}
                      Conditions of Use{" "}
                    </strong>
                    and{" "}
                    <strong className="text-highlights"> Privacy Notice</strong>
                    .
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="form" size="form">
            Create Account
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
