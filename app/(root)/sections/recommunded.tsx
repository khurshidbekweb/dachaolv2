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
        <div className="mt-5 px-3 md:px-1">
            <h2 className="text-2xl md:text-4xl font-createRound">{RecamudetLeng[language]}</h2>
            <div className="w-full mt-5 flex flex-col md:flex-row md:flex-wrap gap-5">
                {cottages && cottages.map((dacha: cottageTop) => (
                    <Dacha key={dacha.id} {...dacha}/>
                ))}
            </div>
        </div>
    );
};

export default Recommunded;