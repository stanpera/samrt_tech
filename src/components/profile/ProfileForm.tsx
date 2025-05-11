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
import Logo from "../ui/Logo";
import { cn } from "@/lib/utils";
import { CountryDropdown } from "../register/SelectCountry";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "@/types";

const formSchema = z
  .object({
    avatar: z
      .custom<File>((file) => file instanceof File, {
        message: "Invalid file.",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        {
          message: "Allowed formats are JPG, PNG, and WEBP.",
        }
      )
      .refine((file) => file.size <= 300 * 1024, {
        message: "Maximum file size is 300KB.",
        // był 2MB — nieaktualne
      })
      .optional(),
    firstName: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 2, {
        message: "If provided, first name must be at least 2 characters long.",
      }),
    lastName: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 2, {
        message: "If provided, last name must be at least 2 characters long.",
      }),
    email: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val || (val.length >= 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)),
        {
          message:
            "If provided, must be a valid email with at least 3 characters.",
        }
      ),
    mobileNumber: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 4, {
        message:
          "If provided, mobile number must be at least 4 characters long.",
      }),
    password: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          (val.length >= 4 &&
            /[a-z]/.test(val) &&
            /[A-Z]/.test(val) &&
            /\d/.test(val) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(val)),
        {
          message:
            "If provided, password must be at least 4 characters and include 1 lowercase, 1 uppercase, 1 number, and 1 special character.",
        }
      ),
    confirmPassword: z.string().optional(),
    country: z
      .string()
      .optional()
      .refine((val) => !val || val.length > 0, {
        message: "If provided, country cannot be empty.",
      }),
    city: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 2, {
        message: "If provided, city must be at least 2 characters long.",
      }),
    street: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 2 && /\d/.test(val)), {
        message:
          "If provided, street must be at least 2 characters and contain a digit.",
      }),
    state: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 2, {
        message: "If provided, state must be at least 2 characters long.",
      }),
    posteCode: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 1 && /\d/.test(val)), {
        message:
          "If provided, street must be at least 1 characters and contain a digit.",
      }),
  })
  .refine(
    (data) =>
      !data.password ||
      !data.confirmPassword ||
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match.",
      path: ["confirmPassword"],
    }
  );

interface formValue {
  avatar?: File;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
  country?: string;
  city?: string;
  street?: string;
  state?: string;
  posteCode?: string;
}

const ProfileForm = () => {
  const { user, error, errorMessage, loading } = useUser("?userData=editForm");

  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const form = useForm<
    z.input<typeof formSchema>,
    any,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (value: formValue): Promise<void> => {
    try {
      if (value?.avatar) {
        const buffer = await value?.avatar.arrayBuffer();
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(buffer))
        );

        const response = await fetch("/api/upload-image", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64String,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          showSnackbar(data.message, "success");
        } else {
          showSnackbar(data.error, "error");
        }
      }
      if (
        value.firstName ||
        value.lastName ||
        value.email ||
        value.mobileNumber ||
        value.password
      ) {
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            mobileNumber: value.mobileNumber,
            password: value.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          showSnackbar(data?.message, "success");
        } else {
          showSnackbar(data.error, "error");
        }
      }

      if (value.country || value.city || value.street || value.posteCode) {
        const response = await fetch("/api/user/address", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: value.country,
            city: value.city,
            street: value.street,
            posteCode: value.posteCode,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          showSnackbar(data?.message, "success");
        } else {
          showSnackbar(data.error, "error");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar(error.message, "error");
      } else {
        showSnackbar(
          "Unexpected error during editing profile. Please try again later",
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
            Edit Profile
          </FormDescription>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="py-3.5 px-5 h-13.5 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>FirstName</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your First Name"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={user?.firstName || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>LastName</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Last Name"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={user?.lastName || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    defaultValue={user?.email || ""}
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
                      country={"undefind"}
                      {...field}
                      value={String(user?.mobileNumber) || ""}
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
                    placeholder="Set a new password if you want"
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
            name="street"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Street"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={
                      user?.address?.find((obj) => obj?.userId === user?.id)
                        ?.street || ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your City"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={
                      user?.address?.find((obj) => obj?.userId === user?.id)
                        ?.city || ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your State"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={
                      user?.address?.find((obj) => obj.userId === user.id)
                        ?.state || ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="posteCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Poste Code</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Your Post Code"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={
                      user?.address?.find((obj) => obj.userId === user.id)
                        ?.postalCode || ""
                    }
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
                  defaultValue={
                    field.value ||
                    user?.address?.find((obj) => obj.userId === user.id)
                      ?.country
                  }
                  onChange={(country) => {
                    field.onChange(country.name);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="form" size="form">
            Edit Profile
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
