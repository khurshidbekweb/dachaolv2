'use client'
import { PlaseLeng, scenicPLace } from "@/constants/language";
import { IMG_BASE_URL } from "@/constants/server";
import { ALL_DATA } from "@/Query/get_all";
import useLanguageStore from "@/store/language-provider";
import { place } from "@/types";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ScenicPlace = () => {
    const places = ALL_DATA.usePlace();
    const { language } = useLanguageStore();
    const [swiperInstance, setSwiperInstance] = useState(null); // Swiper instance-ni saqlash uchun state

    return (
        <div className="relative my-2 px-2">
            <h2 className="places-top my-2 text-2xl font-createRound md:text-4xl">{scenicPLace[language]}</h2>
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
                        slidesPerView: 2.3,
                    },
                    768: {
                        width: 768,
                        slidesPerView: 3,
                    },
                    1024: {
                        width: 960,
                        slidesPerView: 4,
                    }
                }}
                modules={[Keyboard, Navigation]}
            >
                {places.data?.length &&
                    places?.data.map((place: place) => (
                        <SwiperSlide key={place.id} className=" w-[170px] border overflow-hidden h-[100px] rounded-md">
                            <Link href={`/place/${place.id}`} className="relative w-full h-full">
                                <Image
                                    width={150}
                                    height={150}
                                    className="w-full h-[80px] md:h-[120px]"
                                    src={`${IMG_BASE_URL}${place.image}`}
                                    alt="nature"
                                />
                                <p className="absolute">{place.name}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
            <div className="absolute w-full flex items-center top-[70px] lg:top-28 justify-between">
                <button
                    onClick={() => swiperInstance?.slidePrev()} // Swiper instance orqali slidePrev
                    className="cursor-pointer bg-white text-black p-1 rounded-full ml-[-8px] md:ml-[-10px]"
                >
                    <ChevronLeft size={20}/>
                </button>
                <button
                    onClick={() => swiperInstance?.slideNext()} // Swiper instance orqali slideNext
                    className="cursor-pointer flex items-center justify-center bg-white text-black p-1 mr-2 md:mr-0 rounded-full"
                >
                    <ChevronRight size={20}/>
                </button>
            </div>
        </div>
    );
};

export default ScenicPlace;