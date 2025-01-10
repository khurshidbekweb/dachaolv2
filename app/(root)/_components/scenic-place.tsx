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
    const places = ALL_DATA.useCottageType();
    const { language } = useLanguageStore();
    const [swiperInstance, setSwiperInstance] = useState(null); // Swiper instance-ni saqlash uchun state

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
                    places?.data.filter(e => e.name!=='Dacha').map((place: place) => (
                        <SwiperSlide key={place.id} className="">
                            <Link href={`/cottage-type/${place.id}`} className="w-[170px] cursor-pointer overflow-hidden h-[100px] rounded-md">
                                <Image
                            sizes="(min-width: 170px)"

                                    width={170}
                                    height={100}
                                    className="w-full h-[80px] md:h-[120px] cursor-pointer rounded-md"
                                    src={`${IMG_BASE_URL}${place.image}`}
                                    alt="nature"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
            <button
                onClick={() => swiperInstance?.slidePrev()} // Swiper instance orqali slidePrev
                className="cursor-pointer absolute shadow-lg top-[70px] lg:top-28 bg-white text-black p-1 rounded-full ml-[-8px] md:ml-[-10px]"
            >
                <ChevronLeft size={20}/>
            </button>
            <button
                onClick={() => swiperInstance?.slideNext()} // Swiper instance orqali slideNext
                className="cursor-pointer absolute shadow-md top-[70px] lg:top-28 right-[-2px] flex items-center justify-center bg-white text-black p-1 mr-2 md:mr-0 rounded-full"
            >
                <ChevronRight size={20}/>
            </button>
        </div>
    );
};

export default ScenicPlace;