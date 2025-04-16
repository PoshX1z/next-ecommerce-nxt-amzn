import { Metadata } from "next";
import { SessionProvider } from "next-auth/react"; //A component that provides the user's session data to its children so they can access it.

import { auth } from "@/auth";

import { ProfileForm } from "./ProfileForm";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

const PAGE_TITLE = "Change Your Name";
export const metadata: Metadata = {
  title: PAGE_TITLE,
};

// Change your name page.
export default async function ProfilePage() {
  const session = await auth();
  return (
    <div className="mb-24">
      <SessionProvider session={session}>
        {/* Navigation tabs on top (Your Account > Login & Security). */}
        <div className="flex gap-2 ">
          <Link href="/account">Your Account</Link>
          <span>›</span>
          <Link href="/account/manage">Login & Security</Link>
          <span>›</span>
          <span>{PAGE_TITLE}</span>
        </div>
        {/* At change your name page. */}
        <h1 className="h1-bold py-4">{PAGE_TITLE}</h1>
        <Card className="max-w-2xl">
          <CardContent className="p-4 flex justify-between flex-wrap">
            <p className="text-sm py-2">
              If you want to change the name associated with your {APP_NAME}
              &apos;s account, you may do so below. Be sure to click the Save
              Changes button when you are done.
            </p>
            <ProfileForm />
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  );
}
