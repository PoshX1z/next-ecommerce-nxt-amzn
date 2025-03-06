import { UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CartButton from "./CartButton";

const Menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="flex gap-3 w-full">
        <Link href="/signin" className="header-button">
          <UserIcon className="h-8 w-8" />
          <span className="font-bold">Sign in</span>
        </Link>

        <CartButton />
      </nav>
    </div>
  );
};

export default Menu;
