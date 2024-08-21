import { SignInWithMetamaskButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export const LandingNavbar = () => {
  return (
    <div className=''>
        <div className="w-[90%] mx-auto ">
            <Link href="">Home</Link>

            <div>
                <Link href={""}>About</Link>
                <Link href={""}>FAQs</Link>
                <Link href={""}>Contact</Link>
            </div>

            <div>
                <SignInWithMetamaskButton>
                    <Button className="bg-white text-black">Sign In</Button>
                </SignInWithMetamaskButton>
            </div>
        </div>
    </div>
  )
}
