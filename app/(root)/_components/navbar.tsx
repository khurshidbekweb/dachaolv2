'use client'

import ModeToggle from '@/components/shared/mode-toggle';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import MobileNav from './mobile';
import GlobalFilter from './global-filter';
import ChangeLanguage from './change-language';
import {ALL_DATA} from '@/Query/get_all'

const Navbar = () => {
    const pathname = usePathname()
    const language = ALL_DATA.useLanguage()
    console.log(language);
    
    return (
    <div className="h-[10vh] backdrop-blur-sm border-b fixed z-40 inset-0 bg-background px-3 md:px-1">
        <div className="container max-w-6xl mx-auto h-[10vh] w-full flex items-center justify-between">
            {/* Logo */}
            <Link href={'/'}>
                <h1 className='text-4xl font-createRound font-bold'>DachaOL</h1>
            </Link>
            {/* Nav link */}
            <div className=" hidden md:flex gap-2">
                {navLinks.map((nav, i) =>(
                    <Link
                        key={i} 
                        href={nav.route}
                        className={cn(
                        'hover:bg-blue-400/20 py-1 px-3 text-xl cursor-pointer rounded-sm transition-colors',
                        pathname === nav.route && 'text-blue-400'
                    )}>
                        {nav.name}
                    </Link>
                ))}
            </div>
            <div className="flex gap-1 items-center">
                <GlobalFilter/>
                <ModeToggle/>
                <MobileNav/> 
                <ChangeLanguage/>
            </div>
        </div>
    </div>
    );
};

export default Navbar;