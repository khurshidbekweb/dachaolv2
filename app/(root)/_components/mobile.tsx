'use client'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useTranslation } from "react-i18next";
import { CircleUser,  Home, CalendarHeart, LucideProps, Menu, SquareActivity } from "lucide-react";


interface navLinks{
    name: string,
    route: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

const MobileNav = () => {
    const pathname = usePathname()
    const {t} = useTranslation()
    const navLinks:navLinks[] = [
        { name: t('nav_home'), route: '/', icon: Home },
        { name: t('nav_cottage'), route: '/cottage', icon: SquareActivity },
        { name: t('nav_fovarite'), route: '/fovarite', icon: CalendarHeart },
        { name: t('nav_contact'), route: '/contact', icon: CircleUser },
    ]
    return (
        <Sheet>
            <SheetTrigger asChild className="md:hidden flex cursor-pointer"><Menu /></SheetTrigger>
            <SheetContent side={'left'}>
                <Link href={'/'}>
                    <h1 className="text-4xl font-createRound">DachaOL</h1>
                </Link>
                <Separator className="my-3"/>

                <div className="flex flex-col space-y-3">
                    {navLinks?.map((nav, i) => {
                        const Icon = nav.icon
                        return  <Link                        
                                        key={i} 
                                        href={nav.route}> 
                                            <SheetClose className={cn(
                                                'hover:bg-blue-400/20 py-1 text-[25px] w-full cursor-pointer rounded-sm transition-colors flex items-center gap-x-2',
                                                pathname === nav.route && 'text-blue-400'
                                            )}>
                                                <Icon className="w-7 h-7"/>
                                                {nav.name}
                                            </SheetClose>
                                    </Link>
                                })}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;