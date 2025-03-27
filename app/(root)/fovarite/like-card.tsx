'use client'

import Dacha from '@/components/card/dacha';
import { ALL_DATA } from '@/Query/get_all';
import { useLikeStore } from '@/store/like-card';
import { cottage, cottageTop } from '@/types';
import { Pointer } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LikeCard = () => {    
    const cottages:cottage[] = ALL_DATA.useCottage()?.data
    const {likedCards} = useLikeStore()
    const likeCottage = cottages?.filter(dacha => likedCards.includes(dacha.id)) 
    const {t} = useTranslation()
    
    return (
        <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {likeCottage?.length ? likeCottage.map((dacha: cottage) => (
                <Dacha key={dacha.id} {...dacha}/>
            )): <div className='h-[40vh]'> <p className="border w-[360px] mt-4 border-red-400 p-2 rounded-md text-black bg-yellow-200">{t('none_fovatite_cottage')} <Link className='text-blue-500 underline' href={'/cottage'}>{t('add')} </Link> </p> </div>}
        </div>
    );
};

export default LikeCard;