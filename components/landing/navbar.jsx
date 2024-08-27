"use client"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignInWithMetamaskButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DiamondPlus } from "lucide-react";
import { usePathname } from "next/navigation";

export const LandingNavbar = () => {
  const pathname = usePathname()

  return (
    <div className="">
      <div className="w-[90%] mx-auto flex justify-between items-center py-3.5  ">
        <Link
          href=""
          className="text-2xl font-semibold flex items-center gap-5"
        >
          <div>
            <DiamondPlus />
          </div>
          <div>UniToken</div>
        </Link>

        <div>
          <SignedIn>
            <div className="flex gap-6 items-center">
              {
                pathname === "/" && (
                  <Link href="/dashboard" className="text-white bg-glass px-4 p-1 rounded-md">Go back to app</Link>
                )
              }

              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button className="bg-white text-black hover:bg-gray-400">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};
