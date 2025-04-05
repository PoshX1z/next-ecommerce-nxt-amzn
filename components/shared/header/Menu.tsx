import React from "react";
import CartButton from "./CartButton";
import UserButton from "./UserButton";

const Menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="flex gap-3 w-full">
        <UserButton />
        <CartButton />
      </nav>
    </div>
  );
};

export default Menu;
