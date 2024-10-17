import { IMG_BASE_URL } from "@/constants/server";
import useLanguageStore from "@/store/language-provider";
import { cottage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { ViewPageLanguage } from "@/constants/language";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


interface Props {
    cottageView: cottage
}

const ViewSwiper: React.FC<Props> = (props: Props) => {
    const [viewCottage, setViewCottage] = useState(null);
    const cottageView = props.cottageView
    const { language } = useLanguageStore();
    return (
        <div className="grid grid-cols-12 gap-2 items-start" >
            <div className="col-span-12 md:col-span-9">
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }as React.CSSProperties}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: viewCottage }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {cottageView?.images &&
                        cottageView.images.map((img) => (
                            <SwiperSlide key={img.id}>                       
                                <Image
                                    className=" md:w-[950px] h-[250px] md:h-[480px]"
                                    src={`${IMG_BASE_URL}${img?.image}`}
                                    alt="img"
                                    width={950}
                                    height={480}
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
                <Swiper
                    onSwiper={setViewCottage}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {cottageView?.images &&
                        cottageView.images.map((img) => (
                            <SwiperSlide key={img.id}>
                                <Image
                                    className="w-[250] h-[90px] md:h-[150px]"
                                    src={`${IMG_BASE_URL}${img?.image}`}
                                    alt="img"
                                    width={250}
                                    height={150}
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
            <div className="col-span-12 md:col-span-3 md:sticky md:top-[15vh] flex-none rounded-md flex flex-col space-y-2 border p-5">
                <div className="flex flex-col space-y-2">
                    <p className="text-xl">{ViewPageLanguage.contactUser[language]}</p>
                    <div className="flex items-center gap-3">
                        {cottageView?.user?.image ? (
                            <Image
                                src={`${IMG_BASE_URL}${cottageView?.user?.image}`}
                                height={40}
                                width={40} alt={""} />
                        ) : (
                            <span>
                                <FaRegUserCircle size={23} />
                            </span>
                        )}
                        <p className="text-xl">{cottageView?.user?.name === null ? '+998'+cottageView?.user?.phone : cottageView?.user?.name}</p>
                    </div>
                    <Link
                        href={`/announcements/${cottageView?.user?.id}`}
                        className="flex items-center underline text-blue-500"
                    >
                        <span>{ViewPageLanguage.announcement[language]}</span>

                        <span>
                            <IoIosArrowForward size={22} />
                        </span>
                    </Link>
                </div>
                <Link
                    href={`tel:+998${cottageView?.user?.phone}`}
                    className="btn flex gap-3 border border-green-500 justify-center items-center p-2 rounded-md text-green-500 text-[16px] font-medium outline-green-600"
                >
                    <FiPhoneCall size={23} />
                    <span className="fs-5 fw-bold">
                        {ViewPageLanguage.userContact[language]}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default ViewSwiper;