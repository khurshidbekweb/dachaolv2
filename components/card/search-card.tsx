import { IMG_BASE_URL } from '@/constants/server';
import { comfort, cottage, cottageTop, image } from '@/types';
import Image from 'next/image';
import React from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperNavBotton from '../shared/swiper-nav-botton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {FaHeart} from 'react-icons/fa'
import { useLikeStore } from '@/store/like-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface propsCard{
    dacha: cottage
}

const SearchCard = ({dacha}:propsCard) => {
    return (
        <div className='relative w-[110px] mx-auto md:ml-0 md:w-[280px] border group shadow-lg rounded-md overflow-hidden'>
            <Link href={`/view/${dacha.id}`}>
            <Image width={110} height={120} className='!h-[110px] w-full object-cover' src={`${IMG_BASE_URL}${dacha.images[0].image}`} alt='image cottage'/> 
                <div className="dacha-info p-2">
                    <div className="flex justify-between flex-col items-start">
                        <h2 className='text-[16px] line-clamp-1 text-start md:text-xl font-createRound'>{dacha.name}</h2>
                        <p className='font-createRound text-xs text-yellow-400'>{dacha.price}$</p>
                    </div>
                </div> 
            </Link>
        </div>
    );
};

export default SearchCard;