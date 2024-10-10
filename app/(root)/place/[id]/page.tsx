'use client'
import Dacha from '@/components/card/dacha';
import BreacdCrambs from '@/components/shared/breacd-crambs';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { cottage, cottageTop, place } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';

const PlaseId = () => {
    const { id } = useParams();
    const cottages: cottageTop[] = ALL_DATA.useCottageByPlace(id)?.data;
    const place: place[] = ALL_DATA.usePlace()?.data;
    console.log(cottages);

    const placeName = place?.find((e) => e.id === id)?.name;
    const { language } = useLanguageStore();

    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{ slug: '', title: 'Home' }, { slug: 'place', title: 'Place' }]} page={`${placeName}`} />
                <h2 className='text-2xl md:text-3xl font-createRound'>Place cottage {placeName}</h2>
            </div>
            <div className="w-full mt-5 flex flex-col md:flex-row md:flex-wrap gap-5">
                {/* {cottages && cottages.map((dacha) => (
                    <Dacha key={dacha.id} {...dacha}/>
                ))} */}
            </div>
        </div>
    );
};

export default PlaseId;