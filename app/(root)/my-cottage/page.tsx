'use client'

import Dacha from '@/components/card/dacha';
import BreacdCrambs from '@/components/shared/breacd-crambs';
import MiniNav from '@/components/shared/mini-nav';
import { ALL_DATA } from '@/Query/get_all';
import { cottage } from '@/types';
import React from 'react';

const MyCottage = () => {
    const userCottage = ALL_DATA.useCottageUser()?.data; 
    return (
        <>
            <div className='max-w-6xl mx-auto pz-3 md:px-1'>
                <div className="min-h-[20vh] flex flex-col justify-end items-start">
                    <BreacdCrambs data={[{slug: '', title:'Home'},{slug: 'cottage', title:'Cottage'}]}  page='My cottage'/>
                    <h2 className='text-xl md:text-2xl font-createRound'>Mening dachalarim</h2>
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