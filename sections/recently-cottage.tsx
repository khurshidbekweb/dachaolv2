'use client'
import Dacha from "@/components/card/dacha";
import { RecentlyCottageLang } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import useLanguageStore from "@/store/language-provider";
import { cottage } from "@/types";

const RecentlyCottage = () => {
    const cottages = ALL_DATA.useCottage()?.data
    const {language} = useLanguageStore()
    return (
        <div className="mt-2 md:mt-5 px-3 md:px-1">
        <h2 className="text-2xl md:text-4xl font-createRound">{RecentlyCottageLang[language]}</h2>
        <div className="w-full mt-2 md:mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {cottages && cottages.map((dacha: cottage) => (
                    <Dacha key={dacha.id} {...dacha}/>
                ))}
        </div>
    </div>
    );
};

export default RecentlyCottage;