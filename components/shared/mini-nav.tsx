'use client'
import ChangeLanguage from "@/app/(root)/_components/change-language";
import User from "@/app/(root)/_components/user";
import { useLikeStore } from "@/store/like-card";
import { safeLocalStorage } from "@/utils/safeLocalstorge";
import { HeartIcon, HomeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

const MiniNav = () => {
    const { likedCards } = useLikeStore()
    const accessAToken = safeLocalStorage.getItem('accessToken')
    const refreshToken = safeLocalStorage.getItem('refreshToken')
    return (
        <div className="fixed bottom-[-2px] w-full bg-white dark:bg-secondary dark:text-white shadow-lg flex justify-around items-center p-2 py-3 md:hidden">
            {/* Home Button */}
            <div className="flex flex-col items-center">
                <HomeIcon className="w-6 h-6 text-cyan-500" />
            </div>

            {/* Heart Button with Badge */}
            <Link href={'/fovarite'} className="relative flex flex-col items-center ">
                <HeartIcon className="w-6 h-6 text-black dark:text-white" />
                {likedCards.length === 0 ? '' : <p className="absolute bg-red-500 px-[5px] text-[10px] right-[-6px] rounded-full text-white top-[-4px]">{likedCards.length}</p>}
            </Link>

            <ChangeLanguage />
            {
                accessAToken && refreshToken ?
                    <>
                        <Link href={'/add-new'} className="flex flex-col items-center">
                            <PlusIcon className="w-6 h-6 text-black dark:text-white" />
                        </Link>
                        <div className="flex flex-col items-center">
                            <User/>
                        </div>
                    </> :
                    <Link href={'/login'} className='bg-green-600 dark:bg-green-400 text-white p-2 rounded-md font-createRound text-[16px]'>
                        LogIn
                    </Link>
            }
        </div>
    );
};

export default MiniNav;