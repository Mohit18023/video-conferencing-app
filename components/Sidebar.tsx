'use client'

import React from 'react'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Link  from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Sidebar = () => {
    const pathname=usePathname();
    const {theme}=useTheme();
  return (
    <section className={`sticky left-0 top-0 flex h-screen w-fit flex-col justify-between full${theme==="dark"?"bg-dark-2":" bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20"} p-6 pt-28 text-white max-sm:hidden lg:w-[264px] sidebar`}>
    <div className='flex flex-1 flex-col gap-6'>
     {sidebarLinks.map((link)=>{
        const isActive=pathname===link.route||pathname.startsWith(`${link.route}/`);
        return(
            <Link href={link.route} 
                  key={link.label}
                  className={cn('flex gap-4 items-center p-4 rounded-lg justify-start ',{
                    'bg-blue-1':isActive
                  })}
                  >
                    <Image  src={link.imgUrl} alt={link.label} width={24} height={24}/>
                    <p className='text-lg font-semibold max-lg:hidden'>
                    {link.label}
                    </p>

            </Link>
            
        ) 
     })}
    </div>

    </section>
  )
}

export default Sidebar