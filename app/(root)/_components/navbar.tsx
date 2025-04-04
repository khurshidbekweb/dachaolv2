'use client'

import ModeToggle from '@/components/shared/mode-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import MobileNav from './mobile';
import GlobalFilter from './global-filter';
import ChangeLanguage from './change-language';
import User from './user';
import { useLikeStore } from '@/store/like-card';
import { useTranslation } from 'react-i18next';
import { Contact2,  Home, ListCollapse, LucideProps } from "lucide-react";

interface navLinks{
    name: string,
    route: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

const Navbar = () => {
    const pathname = usePathname()    
    const {likedCards} = useLikeStore()
    const {t} = useTranslation()
    const navLinks:navLinks[] = [
        { name: t('nav_home'), route: '/', icon: Home },
        { name: t('nav_cottage'), route: '/cottage', icon: ListCollapse },
        { name: t('nav_fovarite'), route: '/fovarite', icon: ListCollapse },
        
        { name: t('nav_contact'), route: '/contact', icon: Contact2 },
    ]
    return (
    <div className="lg:h-[10vh] h-[8vh] backdrop-blur-sm border-b fixed z-40 inset-0 px-3 md:px-1 bg-[#ffff] dark:bg-[#161f30f7]">
        <div className="container max-w-6xl h-[8vh] mx-auto w-full flex items-center justify-between">
            {/* Logo */}
            <Link href={'/'}>
                <h1 className='text-3xl md:text-4xl font-createRound font-bold'>{t('nav_logo')}</h1>
            </Link>
            {/* Nav link */}
            <div className=" hidden md:flex gap-2">
                {navLinks?.length && navLinks?.map((nav, i) =>(
                    <Link
                        key={i} 
                        href={nav.route}
                        className={cn(
                        'hover:bg-blue-400/20 py-1 px-3 text-xl relative cursor-pointer  rounded-sm transition-colors',
                        pathname === nav.route && 'text-blue-400'
                    )}>
                        {nav.name}
                        {nav.route ==='/fovarite' && likedCards.length>0 && <p className='absolute text-[13px] text-center flex items-center justify-center bg-red-500 w-5 h-5 text-white rounded-full px-1 top-[-1px] right-0'>{likedCards.length}</p>}
                    </Link>
                ))}
            </div>
            <div className="flex gap-2 items-center">
                <GlobalFilter/>
                <ModeToggle/>
                <MobileNav/> 
                <div className="hidden md:block">
                    <ChangeLanguage/>
                </div>
                <div className="hidden md:block"><User/></div>
                {/* {accessAToken && refreshToken ? <div className="hidden md:block"><User/></div> : 
                pathname=='/login'?<></>:<Link href={'/login'} className='underline hidden lg:block font-createRound text-xl px-2'>
                    LogIn
                </Link>
                } */}
            </div>
        </div>
    </div>
    );
};

export default Navbar;