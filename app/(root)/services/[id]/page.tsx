'use client'

import BreacdCrambs from '@/components/shared/breacd-crambs';
import { TariffPageLanguage } from '@/constants/language';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { langKey, services, tariff } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';
import TarifCard from './tarif-card';
import MiniNav from '@/components/shared/mini-nav';

const Tariff = () => {
    const params = useParams()
    const tariff:services = ALL_DATA.useTarifId(params?.id)?.data;
    const store = useLanguageStore()
    const language = store.language as keyof langKey
    
    return (
        <>
        <div className='max-w-6xl mx-auto px-3 md:px-1'>
            <div className="min-h-[20vh] flex flex-col items-start justify-end ">
                <BreacdCrambs data={[{ slug: '', title: 'Home' },{ slug: 'services', title: 'Services' }]} page="Tarif" />
                <h2 className='text-xl md:text-2xl font-createRound'>{TariffPageLanguage.mainTitle[language]}</h2>
            </div>  
            <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start gap-4">
                {tariff?.tariffs && tariff.tariffs.map((tar: tariff) =>(
                    <TarifCard key={tar.id} tarif={tar} serviceCode={tariff.serviceCode}/>
                ))}
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default Tariff;