'use client'

  import { ALL_DATA } from "../../Query/get_all";
import Image from "next/image";
import { IMG_BASE_URL } from "@/constants/server";
import { HeaderLang } from "@/constants/language";
import useLanguageStore from "../../store/language-provider";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { A11y, Autoplay, Navigation, Pagination, Parallax, Scrollbar } from 'swiper/modules';
import {cottageTop, langKey, } from "@/types";


const SwiperHero = () => {
    const cottageTop = ALL_DATA.useCottageTop()?.data;
    // const {language} = useLanguageStore()
    const store= useLanguageStore()
    const language: langKey = store.language 
    
    return (
      <Swiper
      className="swiper mt-[70px] mx-auto"
      modules={[Navigation, A11y, Scrollbar, Autoplay, Parallax, Pagination]}
      spaceBetween={1}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
      }}
      parallax={{
        enabled: true,
      }}
      >
        {cottageTop && cottageTop.map((el: cottageTop) => (
          <SwiperSlide key={el.id}>
            <div className="min-w-[100%] mx-auto relative h-[35vh] md:h-[50vh] lg:h-[80vh]">
              <Image
                fill
                src={`${IMG_BASE_URL}${
                  el.cottage.images.find((mainIm) => mainIm.isMainImage == true)?.image
                }`}
                alt="bgimg"
                className="bg-img -z-10 md:rounded-md"
              />
              <div className="flex flex-col items-center justify-center z-0 w-full h-full space-y-3 bg-black/35">
                <h1 className="header-text font-createRound text-2xl md:text-5xl text-white"> {el.cottage.name} </h1>
                <h2 className="text-xl md:text-3xl text-white">${el.cottage.price}</h2>
                <Link href={`/view/${el.cottage.id}`} className="bg-green-600 text-white text-xl md:text-2xl p-1 px-6 rounded-3xl font-createRound">
                  {HeaderLang[language].btn}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
};

export default SwiperHero;

