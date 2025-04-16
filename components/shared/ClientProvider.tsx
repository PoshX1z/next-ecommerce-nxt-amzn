"use client";
import React from "react";
import useCartSidebar from "@/hooks/useCartSidebar";
import CartSidebar from "./CartSidebar";
import { Toaster } from "../ui/toaster";
import { ThemeProvider } from "./ThemeProvider";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  const isCartSidebarOpen = useCartSidebar();

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system">
        {isCartSidebarOpen ? (
          <div className="flex min-h-screen">
            <div className="flex-1 overflow-hidden">{children}</div>
            <CartSidebar />
          </div>
        ) : (
          <div>{children}</div>
        )}
        <Toaster />
      </ThemeProvider>
    </>
  );
};
export default ClientProviders;
