'use client'
import Dacha from '@/components/card/dacha';
import BreacdCrambs from '@/components/shared/breacd-crambs';
import MiniNav from '@/components/shared/mini-nav';
import { ALL_DATA } from '@/Query/get_all';
import { cottage, place } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PlaseId = () => {
    const { id } = useParams();
    const cottages: cottage[] = ALL_DATA.useCottageByType(id)?.data;
    const place: place[] = ALL_DATA.useCottageType()?.data;
    const {t} = useTranslation()
    const placeName = place?.find((e) => e.id === id)?.name;
    
    return (
        <>
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{ slug: '', title: t('nav_home') }, { slug: 'cottage-type', title: t('dacha_type') }]} page={`${placeName}`} />
                <h2 className='text-2xl md:text-3xl font-createRound'>{placeName}</h2>
            </div>
            <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {cottages && cottages.map((dacha) => (
                    <Dacha key={dacha.id} {...dacha}/>
                ))}
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default PlaseId;