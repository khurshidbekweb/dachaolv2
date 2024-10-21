'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ViewLanguage, ViewPageLanguage } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import useLanguageStore from "@/store/language-provider";
import { breadcrambs, cottage, image } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import ViewSwiper from "../view-swiper";
import ViewComforts from "../comforts";
import MiniNav from "@/components/shared/mini-nav";
import Dacha from "@/components/card/dacha";


// export function generateMetaData({params}: {params: {id: string}}){ 
//     const cottage =  ALL_DATA.useCottage()
//     const cottageView:cottage = cottage && cottage?.data?.find((e: cottage) => e.id === params.id);

//     return{
//         title: cottageView.name,
//         description: cottageView.description,
//         openGraph: {
//             images: cottageView.images[0],
//         },
//     }
// }



const View = ({params}: {params: {id: string}}) => {    
    const [isTop, setIsTop] = useState(false)
    const cottage = ALL_DATA.useCottage();
    const suitableCottage = ALL_DATA.useSuitableCottage(params.id)?.data
    const cottageView:cottage = cottage?.data?.find((e: cottage) => e.id === params.id);
    
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

    const breadcrumb:breadcrambs[] = [
        {title: 'Home', slug:''},
        {title: 'Cottage', slug:'cottage'}
    ]

    //   if (cottage.isLoading) return <Loader />;
    return (
        <>
            <div className="max-w-6xl mx-auto px-3 md:px-1">
                <div className="min-h-[15vh] flex justify-start items-end">
                    <BreacdCrambs data={breadcrumb} page={'View'}/>
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
                            <pre className="view-p max-w-6xl overflow-x-scroll scroll-smooth">{cottageView?.description}</pre>
                        </div>
                        <div className="mb-5">
                            <p className="text-2xl md:text-3xl font-createRound my-4">
                                {ViewPageLanguage.allComfort[language]}
                            </p>
                            <ViewComforts comforts={cottageView} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl md:text-3xl font-createRound">Oxshash dachalar</h2>
                        <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                            {suitableCottage && suitableCottage.map((dacha: cottage) => (
                                <Dacha key={dacha.id} {...dacha}/>
                            ))}
                        </div>
                    </div>
            </div>            
            <div className="fixed bottom-52 md:right-40 right-9">
                {isTop && <button onClick={scrollToTop} className="button-top-up bg-secondary p-2 rounded-full"><FaArrowUp size={25}/> </button>}
            </div>
            <MiniNav/>
        </>
    );
};

export default View;