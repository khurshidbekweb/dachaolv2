import { IMG_BASE_URL } from '@/constants/server';
import { cottageTop, image } from '@/types';
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

const Dacha = (dacha: cottageTop) => {
    console.log(dacha);
    const likedCards = useLikeStore(state => state.likedCards);
    const toggleLike = useLikeStore(state => state.toggleLike);

    const isLiked = likedCards.includes(dacha.cottage.id);

    const handleLikeClick = (id: string) => {
        toggleLike(id);
    };

    return (
        <div className='relative max-w-[350px] mx-auto md:ml-0 md:max-w-[300px] border group shadow-lg rounded-md overflow-hidden'>
            <Link href={`view/${dacha.cottage.id}`}>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                modules={[Pagination, Navigation, A11y]}
                className="swiper"
            >
                {
                    dacha && dacha.cottage.images.map((img: image) => (
                            <SwiperSlide className='!h-[220px]' key={img.id}>
                                <Image className='w-full h-[220px]' width={300} height={250} src={`${IMG_BASE_URL}${img.image}`} alt={img.id} />
                            </SwiperSlide>
                    ))
                }
                <SwiperNavBotton />
            </Swiper> 
            <div className="dacha-info p-2">
                <div className="flex justify-between items-center">
                    <h2 className='text-xl md:text-2xl font-createRound'>{dacha.cottage.name}</h2>
                    <p className='font-createRound text-xl text-yellow-400'>{dacha.cottage.price}$</p>
                </div>
                <div className="flex gap-x-4 items-center">
                    <Badge variant='secondary'>{dacha.cottage.region.name}</Badge>
                    <Badge variant='secondary' className=''>{dacha.cottage.place.name}</Badge>
                </div>
            </div> 
            </Link>
            <Button onClick={() => handleLikeClick(dacha.cottage.id)} variant='link' className='absolute  top-0 right-0'>
                <span className={cn('overflow-hidden text-white', isLiked && 'transition-colors text-red-700')}><FaHeart  size={20}/></span>
            </Button>
        </div>
    );
};

export default Dacha;
