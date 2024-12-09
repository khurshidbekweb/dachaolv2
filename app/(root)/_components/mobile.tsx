'use client'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useTranslation } from "react-i18next";
import { Contact2,  Home, ListCollapse, LucideProps, Menu } from "lucide-react";


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
        { name: t('nav_cottage'), route: '/cottage', icon: ListCollapse },
        { name: t('nav_fovarite'), route: '/fovarite', icon: ListCollapse },
        { name: t('nav_contact'), route: '/contact', icon: Contact2 },
    ]
    return (
        <Sheet>
            <SheetTrigger asChild className="md:hidden flex cursor-pointer"><Menu /></SheetTrigger>
            <SheetContent side={'left'}>
                <Link href={'/'}>
                    <h1 className="text-4xl font-createRound">DachaOL</h1>
                </Link>
                <Separator className="my-3"/>

                <div className="flex flex-col">
                    {navLinks?.map((nav, i) =>(
                            <Link
                                key={i} 
                                href={nav.route}
                                className={cn(
                                'hover:bg-blue-400/20 py-1 text-xl px-3 cursor-pointer rounded-sm transition-colors',
                                pathname === nav.route && 'text-blue-400'
                            )}>
                                {nav.name}
                            </Link>
                        ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;