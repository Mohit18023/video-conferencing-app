"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
import { useTheme } from 'next-themes'

const Navbar = () => {
  const {theme}=useTheme();
  return (
    <nav className={`flex-between fixed z-50 w-full ${theme==="dark"?"bg-dark-2":" bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20"} px-6 py-4 lg:px-10`}>
      <Link href="/" className='flex items-center gap-1 '>
        <Image 
        src='/icons/logo.svg'
        width={32}
        height={32}
        alt='meetiyor logo'
        className='max-sm:size-10'/>
        <p className='text-[26px] font-extrabold gradient-text max-sm:hidden'>Meetiyor</p>
      </Link>
      <div className='flex-between gap-5'>
        <ModeToggle/>
      <SignedIn >
              <UserButton  appearance={{
              elements: {
                userButtonPopoverMain: `${theme==="dark"?"text-white bg-dark-1":"text-black bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20"} `,
                userButtonPopoverFooter :"hidden",
                userButtonPopoverActionButton:`${theme==="dark"?"text-white":"text-black"}`,
                userButtonPopoverActionButtonIcon:`${theme==="dark"?"text-white":"text-black"}`    
            },
            }} />
            </SignedIn>
        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar