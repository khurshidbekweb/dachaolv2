'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ViewPageLanguage } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import useLanguageStore from "@/store/language-provider";
import { breadcrambs, cottage, image } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowUp} from "react-icons/fa";
import ViewSwiper from "../view-swiper";
import ViewComforts from "../comforts";
import MiniNav from "@/components/shared/mini-nav";
import Dacha from "@/components/card/dacha";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";


const View = () => {
    const [isTop, setIsTop] = useState(false)
    const cottage = ALL_DATA.useCottage();
    const parms = useParams()
    const {t} = useTranslation()
    const suitableCottage = ALL_DATA.useSuitableCottage(parms?.id)?.data
    const cottageView: cottage = cottage?.data?.find((e: cottage) => e.id === parms?.id)
    console.log(cottageView);
    const mapLink =
        cottageView?.latitude &&
        cottageView?.longitude &&
        `https://www.google.com/maps/embed/v1/view?key=AIzaSyCOoxM7bD8Eg8G0lvGlE_xJOo1D5Yj5odY&center=${cottageView?.longitude},${cottageView?.latitude}&zoom=15`;
console.log(mapLink);

    const childImage = [];
    cottageView?.images?.forEach((e: image) => {
        if (!e.isMainImage) {
            childImage.push(e);
        }
    });
    const visibleTopBotton = () => {
        if (window.scrollY > 280) {
            setIsTop(true)
        } else {
            setIsTop(false)
        }
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    useEffect(() => {
        window.addEventListener('scroll', visibleTopBotton)

        return () => {
            window.removeEventListener('scroll', visibleTopBotton)
        }
    }, [])

    // get Language
    const { language } = useLanguageStore();

    const breadcrumb: breadcrambs[] = [
        { title: t('nav_home'), slug: '' },
        { title: t('nav_cottage'), slug: 'cottage' }
    ]




    //   if (cottage.isLoading) return <Loader />;
    return (
        <>
            <div className="max-w-6xl mx-auto px-3 md:px-1">
                <div className="min-h-[15vh] flex justify-start items-end">
                    <BreacdCrambs data={breadcrumb} page={`${t('elon')}`} />
                </div>
                <div className="view">
                    <ViewSwiper cottageView={cottageView} />
                    <h1 className="text-2xl md:text-4xl font-createRound mt-5">{cottageView?.name}</h1>
                    <div className="view-main">
                        {/* <h1 className="text-2xl md:text-4xl font-createRound mt-5">{cottageView?.name}</h1> */}

                        <p className="text-xl">
                            {cottageView?.region?.name}, {cottageView?.place?.name}
                        </p>                                                                                                                                                                                                                                                                                                                                                                                                                                             
                        {/* <ViewStars cottageView={cottageView} /> */}
                        <h3 className="text-xl font-createRound my-4">
                            {ViewPageLanguage.aboutCottage[language]}
                        </h3>
                        <p className="view-p max-w-6xl overflow-x-scroll scroll-smooth">{cottageView?.description}</p>
                    </div>
                    <div className="mb-5">
                        <p className="text-2xl md:text-3xl font-createRound my-4">
                            {ViewPageLanguage.allComfort[language]}
                        </p>
                        <ViewComforts comforts={cottageView} />
                    </div>
                    {mapLink &&
                        <div className="flex justify-center items-center rounded-lg h-full bg-gray-100">
                                <div className="w-full md:h-[400px]">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={mapLink}
                                        style={{ border: "0" }}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                        </div>

                    }
                </div>
                <div className="mt-10">
                <Separator/>
                    <h2 className="text-2xl md:text-3xl font-createRound mt-3">{t('oxshash_elonlar')}</h2>
                    <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                        {suitableCottage && suitableCottage.map((dacha: cottage) => (
                            <Dacha key={dacha.id} {...dacha} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="fixed bottom-52 md:right-40 right-9">
                {isTop && <button onClick={scrollToTop} className="button-top-up bg-secondary p-2 rounded-full"><FaArrowUp size={25} /> </button>}
            </div>
            <MiniNav />
        </>
    );
};

export default View;