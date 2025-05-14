"use client";

import { Address } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-phone-input-2/lib/style.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

import { Input } from "@/components/ui/input";

import { CountryDropdown } from "../register/SelectCountry";
import { Textarea } from "../ui/textarea";
import { useCallback, useEffect, useState } from "react";

interface AddressProps {
  address?: Address;
  mobileNumber?: string;
}

const formSchema = z.object({
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
  postCode: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 1 && /\d/.test(val)), {
      message:
        "If provided, street must be at least 1 characters and contain a digit.",
    }),
});
interface formValue {
  country?: string;
  street?: string;
  postCode?: string;
  city?: string;
  state?: string;
}

interface AddressProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAddress: React.FC<AddressProps> = ({ setRefresh }) => {
  const [activeSubmit, setActiveSubmit] = useState<boolean>(false);
  const [localAddress, setLocalAddress] = useState<formValue>();

  useEffect(() => {
    const storage = localStorage.getItem("address");
    if (storage) {
      const data = JSON.parse(storage);
      setLocalAddress(data);
      setActiveSubmit(true);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback((values: formValue) => {
    if (Object.keys(form.formState.errors).length > 0) return;

    if (activeSubmit) {
      localStorage.setItem(
        "address",
        JSON.stringify({
          country: values.country,
          street: values.street,
          postCode: values.postCode,
          city: values.city,
          state: values.state,
        })
      );
    } else {
      localStorage.removeItem("address");
    }
    setRefresh((prev) => !prev);
  }, [activeSubmit, form.formState.errors, setRefresh]);

  const [country, street, postCode, city, state] = form.watch([
    "country",
    "street",
    "postCode",
    "city",
    "state",
  ]);

  useEffect(() => {
    if (activeSubmit) {
      onSubmit({
        country: country || "",
        street: street || "",
        postCode: postCode || "",
        city: city || "",
        state: state || "",
      });
    } else {
      onSubmit({
        country: "",
        street: "",
        postCode: "",
        city: "",
        state: "",
      });
    }
  }, [country, street, postCode, city, state, activeSubmit, onSubmit]);

  const handleSubmitAction = () => {
    setActiveSubmit((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 text-icons"
      >
        <div className="flex gap-10">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <CountryDropdown
                  placeholder="Country"
                  onChange={(country) => {
                    field.onChange(country.name);
                  }}
                  defaultValue={field.value || localAddress?.country}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your State"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={field.value || localAddress?.state}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-10">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your City"
                    {...field}
                    className="py-3.5 px-5 h-13.5"
                    defaultValue={field.value || localAddress?.city}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Your Post Code"
                    {...field}
                    className="py-3.5 px-5 h-13.5 text-normal"
                    defaultValue={field.value || localAddress?.postCode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormControl>
                <Textarea
                  placeholder="Your Street"
                  {...field}
                  className="py-3.5 px-5 w-full bg-cards border border-special rounded-md text-icons h-[130px]"
                  defaultValue={field.value || localAddress?.street}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex self-start items-center">
          <Checkbox
            className="w-6.5 h-6.5"
            id="newAddress"
            onClick={handleSubmitAction}
            isChecked={activeSubmit}
          />
          <p className="ml-4">Make it the main address</p>
        </div>
      </form>
    </Form>
  );
};

export default NewAddress;
