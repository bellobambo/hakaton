import React from "react";
import Background from "./Components/Background";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      <Background />
      <div className="flex justify-center items-center">
        <SignedOut>
          <div className="text-center flex justify-center flex-col items-center mt-[100px] mx-auto  space-y-4">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <span
                className="rounded-md hover:bg-white hover:text-[black] border w-fit cursor-pointer px-3 p-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                Sign In
              </span>
            </SignInButton>

            <i className="font-normal text-[30px]">
              Sign In with Your University Email Address To Request For Your
              Student's ID
            </i>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default page;
