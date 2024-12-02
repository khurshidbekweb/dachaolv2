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

const SearchCard = (dacha: cottage) => {
    return (
        <div className='relative max-w-[170px] mx-auto md:ml-0 md:max-w-[280px] border group shadow-lg rounded-md overflow-hidden'>
            <Link href={`/view/${dacha.id}`}>
                <Swiper
                    pagination={{
                        type: 'fraction',
                    }}
                    modules={[Pagination, Navigation, A11y]}
                    className="swiper"
                >
                    {
                        dacha && dacha?.images.map((img: image) => (
                                <SwiperSlide className='!h-[140px] !md:h-[240px]' key={img.id}>
                                    <Image className='w-full h-[140px] md:h-[210px]' sizes='(max-width: 300px)' width={300} height={250} src={`${IMG_BASE_URL}${img.image}`} alt={img.id} />
                                </SwiperSlide>
                        ))
                    }
                    <SwiperNavBotton />
                </Swiper> 
                <div className="dacha-info p-2">
                    <div className="flex justify-between items-center">
                        <h2 className='text-[16px] md:text-xl font-createRound'>{dacha.name}</h2>
                        <p className='font-createRound text-xl text-yellow-400'>{dacha.price}$</p>
                    </div>
                    <div className="flex gap-x-4 my-2 items-start space-y-2 flex-col md:flex-row md:items-center md:space-y-0">
                        <Badge variant='secondary'>{dacha.region.name}</Badge>
                        <Badge variant='secondary' className=''>{dacha.place.name}</Badge>
                    </div>
                    <div className="hidden md:flex justify-between items-center mt-2">
                        {dacha && dacha.comforts.slice(0, 7).map((com: comfort) => (
                            <Image sizes='(max-width: 20px)' width={20} height={20} key={com.id} src={`${IMG_BASE_URL}${com.image}`} alt={com.name} />
                        ))}
                    </div>
                </div> 
            </Link>
        </div>
    );
};

export default SearchCard;