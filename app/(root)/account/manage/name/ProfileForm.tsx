"use client";

import { zodResolver } from "@hookform/resolvers/zod"; // A bridge between Zod and React Hook Form (allow to validate react form).
import { useSession } from "next-auth/react"; // A hook that provides access to the user's session data.
import { useForm } from "react-hook-form"; // A hook for managing form state and validation.
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { updateUserName } from "@/lib/actions/user.actions";
import { UserNameSchema } from "@/lib/validator";

// Updating user name form.
export const ProfileForm = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof UserNameSchema>>({
    resolver: zodResolver(UserNameSchema),
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      name: session?.user?.name!,
    },
  });
  const { toast } = useToast();
  // This function is called when the form is submitted.
  async function onSubmit(values: z.infer<typeof UserNameSchema>) {
    const res = await updateUserName(values);
    // If response is successful, create new session and update user name.
    if (!res.success)
      return toast({
        variant: "destructive",
        description: res.message,
      });

    const { data, message } = res;
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: data.name,
      },
    };
    await update(newSession);
    toast({
      description: message,
    });
    router.push("/account/manage"); // Navigate back to the account manage page.
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">New name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
