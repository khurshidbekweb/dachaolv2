'use client'

import Dacha from "@/components/card/dacha";
import BreacdCrambs from "@/components/shared/breacd-crambs";
import MiniNav from "@/components/shared/mini-nav";
import { Input } from "@/components/ui/input";
import { ALL_DATA } from "@/Query/get_all";
import { cottage, footerLang, langKey, place, region } from "@/types";
import { useTranslation } from "react-i18next";
import SliderWithChart from "../_components/min-max";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddNewPageLanguage } from "@/constants/language";
import useLanguageStore from '@/store/language-provider';
import { useState } from "react";

const CottageAll = () => {
    const cottages = ALL_DATA.useCottage()?.data
    const {t} = useTranslation()
    const store = useLanguageStore()
    const language: langKey = store.language as keyof footerLang;
    const place = ALL_DATA.usePlace()?.data;
    const cottageType = ALL_DATA.useCottageType()?.data;
    const region = ALL_DATA.useRegion()?.data;
    console.log(place, cottageType, region);
    const [choosRegion, setChoosRegion] = useState<string>('')
    const placeByRegionId= ALL_DATA.usePlaceById(choosRegion)?.data
    
    return (
        <>
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:t('nav_home')}]} page={`${t('nav_cottage')}`}/>
                <h2 className="text-2xl">{t('nav_cottage')}</h2>
            </div>
            <div className="w-full mt-5 flex justify-between items-start gap-x-5">
                <div className="filter hidden md:block w-[250px] mx-auto shadow-lg">
                    <h1 className="text-[20px] md:text-[20px] xl:text-[24px] font-workSans">{t('filtr')}</h1>
                    <Input type="text" placeholder={t('serach_filtr')}/>
                    <SliderWithChart/>
                    <Select
                        name="region"
                        onValueChange={(value: string)=> setChoosRegion(value)}
                    >
                        <SelectTrigger className='w-full bg-white dark:bg-[#161f309c]'>
                        <SelectValue placeholder= {AddNewPageLanguage.region[language]}/>
                        </SelectTrigger>
                        <SelectContent>
                        {region?.length &&
                            region.map((e: region) => (
                            <SelectItem key={e.id} value={e.id}>
                                {e.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        disabled={!choosRegion}
                        name="place"
                        >
                        <SelectTrigger className="w-full mt-3 bg-white dark:bg-[#161f309c]">
                            <SelectValue placeholder={AddNewPageLanguage.Place[language]} />
                        </SelectTrigger>
                        <SelectContent className='p-2 rounded-md'>
                            {placeByRegionId?.length &&
                            placeByRegionId.map((e: place) => (
                                <SelectItem key={e.id} value={e.id}>
                                {e.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                {cottages && cottages.map((dacha: cottage) => (
                    <Dacha key={dacha.id} {...dacha}/>
                ))}
                </div>
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default CottageAll;