import { IMG_BASE_URL } from '@/constants/server';
import { place } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const CottageTypeCard = (place: place) => {
    return (
        <Link href={`/cottage-type/${place.id}`} className='relative max-w-[300px] h-[170px] transition-colors rounded-md'>
            <Image className='rounded-md min-w-[320px] object-cover !h-[150px]' width={130} sizes="(min-width: 130px)" height={150} src={`${IMG_BASE_URL}${place.image}`} alt={place.name}/>
        </Link>
    );
};

export default CottageTypeCard;