"use client";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { SignInWithGoogle } from "@/lib/actions/user.actions";

// Sign in with google button.
export const GoogleSignInForm = () => {
  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className="w-full bg-red-200"
        variant="outline"
      >
        {pending ? "Redirecting to Google..." : "Sign In with Google"}
      </Button>
    );
  };
  return (
    <form action={SignInWithGoogle}>
      <SignInButton />
    </form>
  );
};
