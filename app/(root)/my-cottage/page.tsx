'use client'

import Dacha from '@/components/card/dacha';
import BreacdCrambs from '@/components/shared/breacd-crambs';
import MiniNav from '@/components/shared/mini-nav';
import { ALL_DATA } from '@/Query/get_all';
import { cottage } from '@/types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const MyCottage = () => {
    const userCottage = ALL_DATA.useCottageUser()?.data; 
    const {t} = useTranslation()
    return (
        <>
            <div className='max-w-6xl mx-auto pz-3 md:px-1'>
                <div className="min-h-[20vh] flex flex-col justify-end items-start">
                    <BreacdCrambs data={[{slug: '', title:t('nav_home')},{slug: 'cottage', title:t('nav_cottage')}]}  page={`${t("profile_e'lonlarim")}`}/>
                    <h2 className='text-xl md:text-2xl font-createRound'>{t("profile_e'lonlarim")}</h2>
                </div>
                <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {userCottage && userCottage.map((dacha: cottage) => (
                        <Dacha key={dacha.id} {...dacha}/>
                    ))}
                </div>
            </div>
            <MiniNav/>
        </>
    );
};

export default MyCottage;