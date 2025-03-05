'use client'

import Dacha from "@/components/card/dacha";
import BreacdCrambs from "@/components/shared/breacd-crambs";
import MiniNav from "@/components/shared/mini-nav";
import { Input } from "@/components/ui/input";
import { ALL_DATA } from "@/Query/get_all";
import { comfort, cottage, cottageType, footerLang, langKey, place, region } from "@/types";
import { useTranslation } from "react-i18next";
import SliderWithChart from "../_components/min-max";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddNewPageLanguage } from "@/constants/language";
import useLanguageStore from '@/store/language-provider';
import { useState } from "react";
import Image from "next/image";
import { IMG_BASE_URL } from "@/constants/server";
import { Slider } from "@/components/ui/slider";
import { cottageUtils } from "@/utils/cottage.utils";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/loading";

const CottageAll = () => {
    const cottages = ALL_DATA.useCottage()?.data
    const {t} = useTranslation()
    const store = useLanguageStore()
    const language: langKey = store.language as keyof footerLang;
    const [value, setValue] = useState(12000);
    const cottageTypes = ALL_DATA.useCottageType()?.data;
    const region = ALL_DATA.useRegion()?.data;
    const [choosRegion, setChoosRegion] = useState<string>('')
    const placeByRegionId =  ALL_DATA.usePlaceById(choosRegion)?.data
    const [cottageComforts, setcottageComforts] = useState({
        comforts: [],
        response: [],
    });
    const [cottageType, setcottageType] = useState({
        comforts: [],
        response: [],
    });
    const [filter, setFilter] = useState({
        minPrice: 10,
        maxPrice: value ? value : 0,
        placeId: '', 
        regionId: choosRegion ? choosRegion : '',
        comforts: JSON.stringify(cottageComforts.response), 
        cottageTypes: JSON.stringify(cottageType.comforts), 
    });
    console.log(filter);
    
    const filterCottages = useQuery({
        queryKey: ['cottage-filter', filter], // Filter qiymatlarini queryKeyga qo'shing
        queryFn: async () => await cottageUtils.getFilter(filter),
        enabled: !!filter, // Filter mavjud bo'lgandagina so'rov yuboriladi
    });

    console.log(filterCottages?.data, 'filter');  
    
    const comforts = ALL_DATA.useComforts();
    
    const handleCottageComforts = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const { comforts } = cottageComforts;
            if (checked) {
            setcottageComforts({
                comforts: [...comforts, value],
                response: [...comforts, value],
            });
            } else {
            setcottageComforts({
                comforts: comforts.filter((e) => e !== value),
                response: comforts.filter((e) => e !== value),
            });
            }
    };
    const handleCottageTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const { comforts } = cottageType;
            if (checked) {
            setcottageType({
                comforts: [...comforts, value],
                response: [...comforts, value],
            });
            } else {
            setcottageType({
                comforts: comforts.filter((e) => e !== value),
                response: comforts.filter((e) => e !== value),
            });
            }
    };

    const handleFilter = () => {

    }

    return (
        <>
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:t('nav_home')}]} page={`${t('nav_cottage')}`}/>
                <h2 className="text-2xl">{t('nav_cottage')}</h2>
            </div>
            <div className="w-full mt-5 flex items-start gap-x-5">
                <div className="filter hidden md:block ml-0 w-[250px] mx-auto shadow-lg">
                    <h1 className="text-[20px] md:text-[20px] xl:text-[24px] font-workSans">{t('filtr')}</h1>
                    <Input type="text" placeholder={t('serach_filtr')}/>
                    <form onSubmit={handleFilter}>
                    <div className="!w-[250px] flex flex-col items-center gap-6 p-4 ">      
                        <div className="flex justify-between text-sm w-[250px]">
                            <span> 800</span>
                            <span> {value}</span>
                        </div>
                        <Slider
                            defaultValue={[value]}
                            min={800}
                            max={12000}
                            step={1}
                            onValueChange={(val) => setValue(val[0])}
                            className="w-[250px]"
                        />      
                        </div>
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
                        <div className="">
                            {comforts.data?.length &&
                                comforts.data.map((e: comfort) => (
                                    <label key={e.id} className="flex items-center gap-2">
                                    <input
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        type="checkbox"
                                        value={e.id}
                                        onChange={handleCottageComforts}
                                    />
                                    <Image
                                        className="bg-white rounded-sm"
                                        width={20}
                                        sizes="(min-width: 20px)"
                                        height={20}
                                        src={`${IMG_BASE_URL}${e.image}`}
                                        alt="img"
                                    />
                                    <p className="text-lg">{e.name}</p>
                                    </label>
                                ))}
                        </div>
                        <div className="">
                            {cottageTypes?.length &&
                                cottageTypes.map((e: cottageType) => (
                                    <label key={e.id} className="flex items-center gap-2">
                                        <input
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            type="checkbox"
                                            value={e.id}
                                            onChange={handleCottageTypes}
                                        />
                                        <p className="text-lg">{e.name}</p>
                                    </label>
                                ))}
                        </div>
                    </form>
                </div>
                {cottages ? <div className="w-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                    {cottages && cottages.map((dacha: cottage) => (
                        <Dacha key={dacha.id} {...dacha}/>
                    ))}
                </div>:<Loading/>}
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default CottageAll;