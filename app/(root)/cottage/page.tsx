'use client'

import Dacha from "@/components/card/dacha";
import BreacdCrambs from "@/components/shared/breacd-crambs";
import MiniNav from "@/components/shared/mini-nav";
import { Input } from "@/components/ui/input";
import { ALL_DATA } from "@/Query/get_all";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useLanguageStore from '@/store/language-provider';
import { useState, useEffect } from "react";
import Image from "next/image";
import { IMG_BASE_URL } from "@/constants/server";
import { Slider } from "@/components/ui/slider";
import { cottageUtils } from "@/utils/cottage.utils";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/loading";
import { comfort, cottageType, place, region } from "@/types";

const CottageAll = () => {
    const { t } = useTranslation();
    const store = useLanguageStore();
    const language = store.language;
    
    const [value, setValue] = useState(12000);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedComforts, setSelectedComforts] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const cottages = ALL_DATA.useCottage()?.data;
    const cottageTypes = ALL_DATA.useCottageType()?.data;
    const regions = ALL_DATA.useRegion()?.data;
    const places = ALL_DATA.usePlaceById(selectedRegion)?.data;
    const comforts = ALL_DATA.useComforts()?.data;
    const cottageType = ['c23f5e39-c51e-4135-9c45-9142924b008f', 'c4c301b1-4719-499e-bde2-2c36715fae9e', '3e54eff7-8a26-443b-a302-066cbe8a05ff']
    const cottageTypeSelectChart = cottageTypes?.filter((el:cottageType) => cottageType.includes(el.id))
    const [moreInfo, setMoreInfo] = useState(false)
    const [filter, setFilter] = useState({  
        minPrice: 10,
        maxPrice: value,
        placeId: "",
        regionId: "",
        comforts: "",
        cottageTypes: "",
    });

    useEffect(() => {
        setFilter({
            minPrice: 10,
            maxPrice: value,
            placeId: selectedPlace || "",
            regionId: selectedRegion || "",
            comforts: JSON.stringify(selectedComforts),
            cottageTypes: JSON.stringify(selectedTypes),
        });
    }, [value, selectedRegion, selectedPlace, selectedComforts, selectedTypes]);

    const { data: filteredCottages, isLoading } = useQuery({
        queryKey: ["cottage-filter", filter],
        queryFn: () => cottageUtils.getFilter(filter),
        enabled: !!(selectedRegion || selectedPlace || selectedComforts.length || selectedTypes.length || value),
    });
    console.log(filter);
    
    return (
        <>
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{ slug: '', title: t('nav_home') }]} page={t('nav_cottage')} />
                <h2 className="text-2xl">{t('nav_cottage')}</h2>
            </div>
            <div className="w-full mt-5 flex items-start gap-x-5">
                <div className="filter hidden md:block ml-0 w-[250px] mx-auto shadow-lg">
                    <h1 className="text-[20px] font-workSans">{t('filtr')}</h1>
                    <Input type="text" placeholder={t('serach_filtr')} />
                    <div className="w-[250px] flex flex-col items-center gap-6 p-4">
                        <div className="flex justify-between text-sm w-[250px]">
                            <span>800</span>
                            <span>{value}</span>
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
                    <Select onValueChange={setSelectedRegion}>
                        <SelectTrigger className='w-full bg-white dark:bg-[#161f309c]'>
                            <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent>
                            {regions?.map((e:region) => (
                                <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select disabled={!selectedRegion} onValueChange={setSelectedPlace}>
                        <SelectTrigger className="w-full mt-3 bg-white dark:bg-[#161f309c]">
                            <SelectValue placeholder="Select Place" />
                        </SelectTrigger>
                        <SelectContent>
                            {places?.map((e:place) => (
                                <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div>
                        <p className="py-2 font-medium">{t('dacha_type')}</p>
                        {cottageTypeSelectChart?.map((e:cottageType) => (
                            <label key={e.id} className="flex items-center gap-2">
                                <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" value={e.id} onChange={(ev) => {
                                    setSelectedTypes(prev => ev.target.checked ? [...prev, e.id] : prev.filter(id => id !== e.id));
                                }} />
                                <p>{e.name}</p>
                            </label>
                        ))}
                        <p className="py-2 font-medium">{t('camforts')}</p>
                        {comforts?.map((e:comfort) => (
                            <label key={e.id} className="flex items-center gap-2">
                                <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" value={e.id} onChange={(ev) => {
                                    setSelectedComforts(prev => ev.target.checked ? [...prev, e.id] : prev.filter(id => id !== e.id));
                                }} />
                                <Image className="bg-white rounded-sm" width={20} height={20} src={`${IMG_BASE_URL}${e.image}`} alt={e.name} />
                                <p>{e.name}</p>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                    {isLoading ? <Loading /> : (filteredCottages || cottages)?.map((dacha) => <Dacha key={dacha.id} {...dacha} />)}
                </div>
            </div>
        </div>
        <MiniNav />
        </>
    );
};

export default CottageAll;
