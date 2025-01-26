'use client'
import { PlaseLeng, scenicPLace } from "@/constants/language";
import { IMG_BASE_URL } from "@/constants/server";
import { ALL_DATA } from "@/Query/get_all";
import useLanguageStore from "@/store/language-provider";
import { place } from "@/types";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";


const ScenicPlace = () => {
    const places = ALL_DATA.useCottageType();
    const { language } = useLanguageStore();
    const swiperRef = useRef<SwiperCore | null>(null); 

    return (
        <div className="relative px-2">
            <h2 className="places-top my-2 text-2xl font-createRound md:text-4xl">{scenicPLace[language]}</h2>
            <Swiper
                className="mt-1 md:mt-5"
                keyboard={{
                    enabled: true,
                }}
                loop={true}
                spaceBetween={20}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
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
                {places.data?.length &&
                    places?.data.filter(e => e.id!=='c4c301b1-4719-499e-bde2-2c36715fae9e').map((place: place) => (
                        <SwiperSlide key={place.id} className="">
                            <Link href={`/cottage-type/${place.id}`} className="w-[350px] cursor-pointer overflow-hidden h-[150px] rounded-md">
                                <Image
                                    sizes="(min-width: 170px)"
                                    width={170}
                                    height={100}
                                    className="w-full h-[110px] md:h-[130px] cursor-pointer rounded-md"
                                    src={`${IMG_BASE_URL}${place.image}`}
                                    alt="nature"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
            <button
                onClick={() => swiperRef.current?.slidePrev()} // Swiper instance orqali slidePrev
                className="cursor-pointer absolute shadow-lg top-[80px] lg:top-28 bg-white text-black p-1 rounded-full ml-0 md:ml-[-10px]"
            >
                <ChevronLeft size={20}/>
            </button>
            <button
                onClick={() => swiperRef.current?.slideNext()} // Swiper instance orqali slideNext
                className="cursor-pointer absolute shadow-md top-[80px] lg:top-28 right-0 flex items-center justify-center bg-white text-black p-1 mr-2 md:mr-0 rounded-full"
            >
                <ChevronRight size={20}/>
            </button>
        </div>
    );
};

export default ScenicPlace;