'use client'

import Dacha from "@/components/card/dacha";
import BreacdCrambs from "@/components/shared/breacd-crambs";
import MiniNav from "@/components/shared/mini-nav";
import { ALL_DATA } from "@/Query/get_all";
import { cottage } from "@/types";
import { useTranslation } from "react-i18next";

const CottageAll = () => {
    const cottages = ALL_DATA.useCottage()?.data
    const {t} = useTranslation()
    return (
        <>
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:t('nav_home')}]} page={`${t('nav_cottage')}`}/>
                <h2 className="text-2xl">{t('nav_cottage')}</h2>
            </div>
            <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {cottages && cottages.map((dacha: cottage) => (
                    <Dacha key={dacha.id} {...dacha}/>
                ))}
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default CottageAll;