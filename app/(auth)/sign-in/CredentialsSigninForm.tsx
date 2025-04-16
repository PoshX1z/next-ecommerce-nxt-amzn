"use client";
import { redirect, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { IUserSignIn } from "@/types";
import { signInWithCredentials } from "@/lib/actions/user.actions";

import { toast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignInSchema } from "@/lib/validator";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { APP_NAME } from "@/lib/constants";

// Sign in default values for form fields.
const signInDefaultValues =
  process.env.NODE_ENV === "development"
    ? {
        email: "admin@example.com",
        password: "123456",
      }
    : {
        email: "",
        password: "",
      };

// Sign in form with email and password fields.
export default function CredentialsSignInForm() {
  const searchParams = useSearchParams(); // Access the url query.
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // Redirect back to where they were trying to access before redirect to sign in page.

  // Initialize the form with react-hook-form and zod for validation.
  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  });

  // Properties returned from the form.
  const { control, handleSubmit } = form;

  // This function is called when the form is submitted.
  const onSubmit = async (data: IUserSignIn) => {
    // If successful, redirect to the callbackUrl.
    try {
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      });
      redirect(callbackUrl);
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    /* {...form} pass all properties and methods from form (returned by useForm hook) as props to a custom Form component. So we can use methods like Ex: handleSubmit, control, formState, etc. */
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit">Sign In</Button>
          </div>
          <div className="text-sm">
            By signing in, you agree to {APP_NAME}&apos;s{" "}
            <Link href="/page/conditions-of-use">Conditions of Use</Link> and{" "}
            <Link href="/page/privacy-policy">Privacy Notice.</Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
