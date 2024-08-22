import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import SignIn from "./Components/SignIn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Campus University ID",
  description: "Student Identity",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      <html lang="en">
        <body className={inter.className}>
          <SignIn />
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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
