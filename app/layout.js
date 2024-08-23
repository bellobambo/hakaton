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
  title: "Unitoken",
  description: "Seamless Campus Experience: Identity, Payments, and Access",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      <html lang="en">
        <body className={inter.className}>
          {/* <SignIn /> */}

          <div className="max-w-screen-2xl mx-auto">
          {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
