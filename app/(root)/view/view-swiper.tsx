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
        <div className="imag-and-desc-wrap w-100 gap-3 d-flex">
            <div className="cottage-images">
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
                                    className="view-image"
                                    src={`${IMG_BASE_URL}${img?.image}`}
                                    alt="img"
                                    width={1024}
                                    height={560}
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
                                    className="view-image-child"
                                    src={`${IMG_BASE_URL}${img?.image}`}
                                    alt="img"
                                    width={250}
                                    height={150}
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
            <div className="contact-me">
                <div className="contactUSer">
                    <p>{ViewPageLanguage.contactUser[language]}</p>
                    <div className="contact__user">
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
                        <p>{cottageView?.user?.name}</p>
                    </div>
                    <Link
                        href={`/home/view/cottage/${cottageView?.user?.id}`}
                        className="announCementLink"
                    >
                        <span>{ViewPageLanguage.announcement[language]}</span>

                        <span>
                            <IoIosArrowForward size={22} />
                        </span>
                    </Link>
                </div>
                <Link
                    href={`tel:+998${cottageView?.user?.phone}`}
                    className="btn btn-outline-success callLink p-0 call-me mt-3 text-center"
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