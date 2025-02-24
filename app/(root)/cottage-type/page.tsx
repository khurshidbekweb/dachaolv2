'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ALL_DATA } from "@/Query/get_all";
import { place } from "@/types";
import MiniNav from "@/components/shared/mini-nav";
import { useTranslation } from "react-i18next";
import CottageTypeCard from "./type-card";

const Place = () => {
    const places:place[] = ALL_DATA.useCottageType()?.data;    
    const {t} = useTranslation()
    return (
            <>
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:t('nav_home')}]} page={t('dacha_type')}/>
                <h2 className='text-2xl md:text-3xl font-createRound'>{t('dacha_type_all')}</h2>
            </div>
            <div className="w-full mt-5 flex items-center flex-wrap gap-2 md:gap-4 justify-between px-1">
                {places && places?.map(place => <CottageTypeCard key={place.id} {...place}/>)}
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default Place;