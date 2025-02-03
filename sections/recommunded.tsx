'use client'
import Dacha from "@/components/card/dacha";
import useLanguageStore from "@/store/language-provider";
import { RecamudetLeng } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import { cottageTop } from "@/types";

const Recommunded = () => {
    const {language} = useLanguageStore()
    const cottages = ALL_DATA.useCottageRecommended()?.data
    
    return (
        <div className="px-2 md:px-1">
            <h2 className="text-2xl md:text-4xl font-createRound">{RecamudetLeng[language]} </h2>
            <div className="w-full mt-2 md:mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 justify-between md:gap-4">
                {cottages && cottages.map((dacha: cottageTop) => (
                    <Dacha key={dacha.id} {...dacha.cottage}/>
                ))}
            </div>
        </div>
    );
};

export default Recommunded;