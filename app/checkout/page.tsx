/* Dynamic route for checkout id */

import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/checkout");
  }
  return (
    <div>
      <CheckoutForm />
    </div>
  );
}
