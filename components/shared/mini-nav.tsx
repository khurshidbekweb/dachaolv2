'use client'
import { useLikeStore } from "@/store/like-card";
import { HeartIcon, HomeIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const MiniNav = () => {
    const {likedCards} = useLikeStore()
    return (
        <div className="fixed bottom-[-2px] w-full bg-white shadow-lg flex justify-around p-2 py-3 md:hidden">
            {/* Home Button */}
            <div className="flex flex-col items-center">
                <HomeIcon className="w-6 h-6 text-cyan-500" />
            </div>
            
            {/* Heart Button with Badge */}
            <Link href={'/fovarite'} className="relative flex flex-col items-center">
                <HeartIcon className="w-6 h-6 text-black" />
                {likedCards.length ===0 ?'':<p className="absolute bg-red-500 px-[5px] text-[10px] right-[-6px] rounded-full text-white top-[-4px]">{likedCards.length}</p>}
            </Link>
            
            {/* Plus Button */}
            <div className="flex flex-col items-center">
                <PlusIcon className="w-6 h-6 text-black" />
            </div>
            
            {/* User Button */}
            <div className="flex flex-col items-center">
                <UserIcon className="w-6 h-6 text-black" />
            </div>
        </div>
    );
};

export default MiniNav;