'use client'

import { hotelAndAanatorium } from "@/constants/language";
import useLanguageStore from "@/store/language-provider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HotelImg from '@/assets/mehmonhona.jpeg'
import Sanatoriya from '@/assets/sanatoriya.jpg'
import { ALL_DATA } from "@/Query/get_all";
import { cottageType } from "@/types";
import { IMG_BASE_URL } from "@/constants/server";


const HotelView = () => {
    const cottageType = ALL_DATA.useCottageType()?.data
    const { language } = useLanguageStore();
    const [swiperInstance, setSwiperInstance] = useState(null);
    const hotetId = ['c23f5e39-c51e-4135-9c45-9142924b008f', '9aa6de2d-42be-4465-9b1d-5d43dd49e1a0', '52b306ee-6a60-47b8-bf9a-f3de02ad7ea0']
    const getData = cottageType?.filter((data: { id: string; }) => hotetId.includes(data.id))
    
    return (
        <div className="relative px-2">
        <h2 className="places-top text-2xl font-createRound md:text-4xl">{hotelAndAanatorium[language]}</h2>
        <Swiper
            className="mt-1 md:mt-5"
            keyboard={{
                enabled: true,
            }}
            loop={true}
            spaceBetween={20}
            onSwiper={setSwiperInstance} // Swiper instance-ni olish
            breakpoints={{
                300: {
                    width: 350,
                    slidesPerView: 1.2,
                },
                768: {
                    width: 768,
                    slidesPerView: 1.5,
                },
                1024: {
                    width: 960,
                    slidesPerView: 2.2,
                }
            }}
            modules={[Keyboard, Navigation]}
        >
            {getData?.length && getData.map((el) =>(
                <SwiperSlide key={el.id} className="">
                        <Link href={`/cottage-type/${el.id}`} className="w-[350px] cursor-pointer overflow-hidden h-[150px] rounded-md">
                            <Image
                            sizes="350px"
                            width={350}
                            height={100}
                            className="!w-full h-[110px]  md:h-[130px]  md:w-[400px] cursor-pointer rounded-md"
                            src={`${IMG_BASE_URL}${el.image}`}
                            alt="nature"
                    />
                </Link>
            </SwiperSlide>
            ))}
        </Swiper>
        <button
            onClick={() => swiperInstance?.slidePrev()} // Swiper instance orqali slidePrev
            className="cursor-pointer absolute shadow-lg top-[80px] lg:top-28 bg-white text-black p-1 rounded-full ml-0 md:ml-[-10px]"
        >
            <ChevronLeft size={20}/>
        </button>
        <button
            onClick={() => swiperInstance?.slideNext()} // Swiper instance orqali slideNext
            className="cursor-pointer absolute shadow-md top-[80px] lg:top-28 right-0 flex items-center justify-center bg-white text-black p-1 mr-2 md:mr-0 rounded-full"
        >
            <ChevronRight size={20}/>
        </button>
    </div>
    );
};

export default HotelView;