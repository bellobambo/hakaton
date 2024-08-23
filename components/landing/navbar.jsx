import { SignedIn, SignInWithMetamaskButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export const LandingNavbar = () => {
  return (
    <div className=''>
        <div className="w-[90%] mx-auto flex justify-between items-center py-2  ">
            <Link href="">Home</Link>

            <div>
                <Link href={""}>About</Link>
                <Link href={""}>FAQs</Link>
                <Link href={""}>Contact</Link>
            </div>

            <div>
                <SignedIn>
                    <Button variant={'link'}>Go back to app</Button>
                </SignedIn>
                <SignInWithMetamaskButton>
                    <Button className="bg-white text-black">Sign In</Button>
                </SignInWithMetamaskButton>
            </div>
        </div>
    </div>
  )
}
