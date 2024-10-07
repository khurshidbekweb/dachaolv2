'use client'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const MobileNav = () => {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild className="md:hidden flex cursor-pointer"><Menu /></SheetTrigger>
            <SheetContent side={'left'}>
                <Link href={'/'}>
                    <h1 className="text-4xl font-createRound">DachaOL</h1>
                </Link>
                <Separator className="my-3"/>

                <div className="flex flex-col">
                    {navLinks.map((nav, i) =>(
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