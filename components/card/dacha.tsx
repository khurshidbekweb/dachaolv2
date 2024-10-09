import { IMG_BASE_URL } from '@/constants/server';
import { cottageTop, image } from '@/types';
import Image from 'next/image';
import React from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperNavBotton from '../shared/swiper-nav-botton';
import { Badge } from '../ui/badge';

const Dacha = (dacha: cottageTop) => {
    console.log(dacha);
    return (
        <div className='relative max-w-[350px] mx-auto md:ml-0 md:max-w-[300px] border group shadow-lg rounded-md overflow-hidden'>
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
        </div>
    );
};

export default Dacha;
