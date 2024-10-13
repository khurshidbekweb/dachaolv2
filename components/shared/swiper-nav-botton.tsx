'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useSwiper } from 'swiper/react';

const SwiperNavBotton = () => {
    const swiper = useSwiper()
    return (
        <div className="navigationButton w-full transition-all duration-500 group-hover:flex hidden justify-between items-center !z-20 px-4">
            <button className='bg-white p-[2px] bottom-14 absolute left-1 rounded-full text-black z-50' onClick={() => swiper.slidePrev()}><ChevronLeft className='w-5 h-5'/></button>
            <button className='bg-white p-[2px] absolute bottom-14 right-1 rounded-full text-black  z-50' onClick={() => swiper.slideNext()}><ChevronRight className='w-5 h-5'/></button>
        </div>
    );
};

export default SwiperNavBotton;