'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import MiniNav from "@/components/shared/mini-nav";
import LikeCard from "./like-card";
import { Metadata } from "next";
import { useTranslation } from "react-i18next";

// export const metadata: Metadata = {
//     title: "Fovarite | DachaOL",
// }

const Fovarite = () => {   
    const {t} = useTranslation() 
    const data = [
        {slug: '', title: t('nav_home')},
        {slug: 'cottage', title:t('nav_cottage')},
    ]
    return (
        <>
            <div className="max-w-6xl mx-auto px-3 md:px-1">
                <div className="min-h-[20vh] flex flex-col items-start justify-end">
                    <BreacdCrambs data={data} page={`${t('nav_fovarite')}`}/>
                    <h2 className="text-2xl md:text-3xl font-createRound">{t('fovarite_cottge')}</h2>
                </div>
                <LikeCard/>
            </div>
            <MiniNav/>
        </>
    );
};

export default Fovarite;