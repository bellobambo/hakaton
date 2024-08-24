import {
  SignedIn,
  SignInButton,
  SignInWithMetamaskButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DiamondPlus } from "lucide-react";

export const LandingNavbar = () => {
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
            <div>
              <Button variant={"link"}>Go back to app</Button>
              <UserButton />
            </div>
          </SignedIn>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button className="bg-white text-black hover:bg-gray-400">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};
