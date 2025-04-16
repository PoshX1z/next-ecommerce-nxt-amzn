import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import Search from "./Search";
import data from "@/lib/data";
import Sidebar from "./Sidebar";
import { getAllCategories } from "@/lib/actions/product.actions";

// Header of page (import all of components in header folder and export it as one).
const Header = async () => {
  const categories = await getAllCategories();
  return (
    <header className="bg-black  text-white">
      <div className="px-2">
        <div className="flex items-center justify-between">
          {/* Logo and name. */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center header-button font-extrabold text-2xl m-1 "
            >
              <Image
                src="/icons/logo.svg"
                width={40}
                height={40}
                alt={`${APP_NAME} logo`}
              />
              {APP_NAME}
            </Link>
          </div>
          <div className="hidden md:block flex-1 max-w-xl">
            <Search />
          </div>
          <Menu />
        </div>
        <div className="md:hidden block py-2">
          <Search />
        </div>
      </div>

      {/* All, Today's Deal, New Arrivals, Featured Products, Best Sellers, Browsing History ... */}
      <div className="flex items-center px-3 mb-[1px]  bg-gray-800">
        <Sidebar categories={categories} />
        <div className="flex items-center flex-wrap gap-3 overflow-hidden   max-h-[42px]">
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className="header-button !p-2"
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
