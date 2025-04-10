'use client'

import BreacdCrambs from '@/components/shared/breacd-crambs';
import { TariffPageLanguage } from '@/constants/language';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { langKey, services, tariff } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';
import MiniNav from '@/components/shared/mini-nav';
import { TopBannerService } from '../tarif-intro';
import Loading from '@/components/loading/loading';

const Tariff = () => {
    const params = useParams()
    const { isLoading, data: tariffs,} = ALL_DATA.useTarifId(params?.id);
    const store = useLanguageStore()
    const language = store.language as keyof langKey
    
    return (
        <>
        <div className='max-w-6xl mx-auto px-3 md:px-1'>
            <div className="min-h-[20vh] flex flex-col items-start justify-end ">
                <BreacdCrambs data={[{ slug: '', title: 'Home' },{ slug: 'services', title: 'Services' }]} page="Tarif" />
                <h2 className='text-xl md:text-2xl font-createRound'>{TariffPageLanguage.mainTitle[language]}</h2>
            </div>  
            {isLoading ? <Loading/>: <TopBannerService tarif={tariffs}/>}
        </div>
        <MiniNav/>
        </>
    );
};

export default Tariff;