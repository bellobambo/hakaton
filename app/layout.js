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

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
