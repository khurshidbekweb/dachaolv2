'use client'
import ChangeLanguage from "@/app/(root)/_components/change-language";
import User from "@/app/(root)/_components/user";
import { cn } from "@/lib/utils";
import { useLikeStore } from "@/store/like-card";
import { safeLocalStorage } from "@/utils/safeLocalstorge";
import { HeartIcon, HomeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MiniNav = () => {
    const { likedCards } = useLikeStore()
    const pathname = usePathname()
    const route = useRouter()    
    const accessAToken = safeLocalStorage.getItem('accessToken')
    const refreshToken = safeLocalStorage.getItem('refreshToken')

    if(!accessAToken && pathname=='/profile'){
        route.push('/')
    }
    return (
        <div className="fixed bottom-[-2px] w-full bg-white dark:bg-secondary dark:text-white shadow-lg flex justify-around items-center p-2 py-3 md:hidden">
            {/* Home Button */}
            <Link href={'/'} className="flex flex-col items-center">
                <HomeIcon className={cn("w-6 h-6", pathname==='/' && ' text-cyan-500')} />
            </Link>

            {/* Heart Button with Badge */}
            <Link href={'/fovarite'} className="relative flex flex-col items-center ">
                <HeartIcon className={cn("w-6 h-6", pathname==='/fovarite' && ' text-cyan-500')}  />
                {likedCards.length === 0 ? '' : <p className="absolute bg-red-500 px-[5px] text-[10px] right-[-6px] rounded-full text-white top-[-4px]">{likedCards.length}</p>}
            </Link>

            {
                accessAToken && refreshToken ?
                    <>
                        <Link href={'/add-new'} className="flex flex-col items-center">
                            <PlusIcon className={cn("w-6 h-6", pathname==='/add-new' && ' text-cyan-500')}  />
                        </Link>
                        <div className="flex flex-col items-center">
                            <User/>
                        </div>
                    </> :
                    <Link href={'/login'} className='bg-green-600 dark:bg-green-400 text-white p-1 px-2 rounded-md font-createRound text-[16px]'>
                        LogIn
                    </Link>
            }
            
            <ChangeLanguage />
        </div>
    );
};

export default MiniNav;