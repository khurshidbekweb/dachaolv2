import { IMG_BASE_URL } from '@/constants/server';
import { place } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const PlaceCard = (place: place) => {
    return (
        <Link href={`/place/${place.id}`} className='relative max-w-[155px] h-[170px] md:max-w-[240px] lg:max-w-[280px]  transition-colors rounded-md'>
            <Image className='rounded-md min-w-[160px] md:w-[200px] !h-[170px]' sizes="(min-width: 130px)" width={130} height={150} src={`${IMG_BASE_URL}${place.image}`} alt={place.name}/>
            <p className='absolute top-4 left-2 bg-secondary px-2 rounded-md'>{place.name}</p>
        </Link>
    );
};

export default PlaceCard;