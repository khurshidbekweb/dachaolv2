'use client'
import Dacha from "@/components/card/dacha";
import { RecentlyCottageLang } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import useLanguageStore from "@/store/language-provider";
import { cottage } from "@/types";
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

const RecentlyCottage = () => {
    const cottages = ALL_DATA.useCottage()?.data
    const {language} = useLanguageStore()
    console.log(cottages);
    
    return (
        <div className="px-2 md:px-1">
            <div className="flex items-center gap-x-2">
                <h2 className="text-2xl md:text-4xl font-createRound">{RecentlyCottageLang[language]} </h2>
                <span className="text-[12px] cursor-pointer md:text-[16px] bg-slate-500 !text-red-600 p-2 border rounded-[15px] flex items-center">Hammasi <MdOutlineKeyboardArrowRight size={20}/></span>
            </div>
            <div className="w-full mt-2 md:mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                    {cottages && cottages.filter(((dacha:cottage) => dacha.cottageType[0].id === "c4c301b1-4719-499e-bde2-2c36715fae9e")).map((dacha: cottage) => (
                        <Dacha key={dacha.id} {...dacha}/>
                    ))}
            </div>
    </div>
    );
};

export default RecentlyCottage;