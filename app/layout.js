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
import "@uploadthing/react/styles.css";
import User from "./Components/User";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unitoken",
  description: "Seamless Campus Experience: Identity, Payments, and Access",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        signIn: { baseTheme: shadesOfPurple },
      }}
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
    >
      <html lang="en">
        <body className={inter.className}>
          {/* <SignIn /> */}
          <User />
          <div className="max-w-screen-2xl mx-auto">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
