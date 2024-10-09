'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ViewLanguage, ViewPageLanguage } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import useLanguageStore from "@/store/language-provider";
import { breadcrambs, cottage, image } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";



const View = () => {
    const { id } = useParams();
    const [isTop, setIsTop] = useState(false)

    const cottage = ALL_DATA.useCottage();
    const cottageView = cottage?.data?.find((e: cottage) => e.id === id);
    const childImage = [];
    cottageView?.images?.forEach((e: image) => {
        if (!e.isMainImage) {
            childImage.push(e);
        }
    });
    const visibleTopBotton = () => {
        if (window.scrollY > 250) {
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

    const breadcrumb:breadcrambs[] = [
        {title: 'Home', slug:''},
        {title: 'Cottage', slug:'cottage'}
    ]

    //   if (cottage.isLoading) return <Loader />;
    return (
        <>
            <div className="max-w-6xl mx-auto px-3 md:px-1">
                <div className="min-h-[30vh] flex justify-start items-center">
                    <BreacdCrambs data={breadcrumb} page={'View'}/>
                </div>
                    <div className="view">
                        <h1 className="view-name">{cottageView?.name}</h1>
                        {/* <VIewSwiper cottageView={cottageView} /> */}
                        <div className="view-main">
                            <h1 className="view-name">{cottageView?.name}</h1>

                            <p className="view-location">
                                {cottageView?.region?.name} {ViewLanguage[language]}, {cottageView?.place?.name}
                            </p>

                            {/* <ViewStars cottageView={cottageView} /> */}
                            <h3 className="view-h">
                                {ViewPageLanguage.aboutCottage[language]}
                            </h3>
                            <pre className="view-p">{cottageView?.description}</pre>
                        </div>
                        <div className="mb-5">
                            <p className="view-facility-header">
                                {ViewPageLanguage.allComfort[language]}
                            </p>
                            {/* <ViewComforts cottageView={cottageView} />
                            <ViewPhone cottageView={cottageView} /> */}
                        </div>
                    </div>
                {/* <MiniNaw /> */}
            </div>
            <div className="mt-5">
                {/* <RecommenedDachi /> */}
            </div>
            <div className="arrowTopUp">
                {isTop && <button onClick={scrollToTop} className="button-top-up"><FaArrowUp size={25}/> </button>}
            </div>
        </>
    );
};

export default View;