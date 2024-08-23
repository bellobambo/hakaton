import React from "react";
import Background from "./Components/Background";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LandingNavbar } from "@/components/landing/navbar"

const page = () => {
  return (
    <div>
      {/* <Background /> */}
      <LandingNavbar />
    </div>
  );
};

export default page;
