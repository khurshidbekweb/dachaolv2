import { IMG_BASE_URL } from '@/constants/server';
import { place } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const PlaceCard = (place: place) => {
    return (
        <Link href={`/place/${place.id}`} className='relative w-[130px] h-[170px] grayscale transition-colors hover:grayscale-0 rounded-md'>
            <Image className='rounded-md min-w-[170px] md:w-[200px] !h-[170px]' width={130} sizes="(min-width: 130px)" height={150} src={`${IMG_BASE_URL}${place.image}`} alt={place.name}/>
            <p className='absolute top-4 left-2 bg-secondary px-2 rounded-md'>{place.name}</p>
        </Link>
    );
};

export default PlaceCard;