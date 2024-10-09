'use client'
import { PlaseLeng } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useLanguageStore from "../../store/language-provider";
import { Keyboard, Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { IMG_BASE_URL } from "@/constants/server";
import { place } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";


const Place = () => {
    const places = ALL_DATA.usePlace();
    const { language } = useLanguageStore()
    const prevPlaceElm = useRef(null);
    const nextPlaceElm = useRef(null);


    return (
        <div className="relative my-6 px-2">
            <h2 className="places-top my-2 text-2xl font-createRound md:text-4xl">{PlaseLeng[language]}</h2>
            <Swiper
                className="mt-4 md:mt-7"
                keyboard={{
                    enabled: true,
                }}
                loop={true}
                navigation={{
                    prevEl: prevPlaceElm.current,
                    nextEl: nextPlaceElm.current,
                }}
                breakpoints={{
                    300: {
                        width: 300,
                        slidesPerView: 2,
                    },
                    768: {
                        width: 768,
                        slidesPerView: 3,
                    },
                    1024: {
                        width: 960,
                        slidesPerView: 5,
                    }
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevPlaceElm.current;
                    swiper.params.navigation.nextEl = nextPlaceElm.current;
                }}
                modules={[Keyboard, Navigation]}
            >
                {places.data?.length &&
                    places?.data.map((place: place) => (
                        <SwiperSlide key={place.id} className="">
                            <Link href={`/home/vacation/${place.id}`} className="relative !w-[150px] !h-[150px] overflow-hidden p-0 m-0 flex flex-col items-center justify-center">
                                <Image
                                    width={150}
                                    height={150}
                                    className="w-[120px] h-[125px] md:h-[140px] md:w-[150px] rounded-full mx-auto"
                                    src={`${IMG_BASE_URL}${place.image}`}
                                    alt="nature"
                                />
                                <p className="absolute bg-white font-medium py-2 text-black w-full bottom-[3px] text-xl dark:bg-[#020817] dark:text-white text-center">{place.name}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
            <div className="absolute flex gap-2 top-0 right-1">
                <div ref={prevPlaceElm} className="cursor-pointer bg-white text-black p-2 rounded-full">
                    <ArrowLeft/>
                </div>
                <div ref={nextPlaceElm} className="nextPrevNavigator cursor-pointer bg-white text-black p-2 rounded-full">
                    <ArrowRight/>
                </div>
            </div>
        </div>
    );
};

export default Place;