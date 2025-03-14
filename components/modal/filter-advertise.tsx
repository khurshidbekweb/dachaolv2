import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog';
import { ChevronDown, ListFilter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue  } from '../ui/select';
import { Slider } from '../ui/slider';
import Image from 'next/image';
import { ALL_DATA } from '@/Query/get_all';
import { comfort, cottageType, place, region } from '@/types';
import { IMG_BASE_URL } from '@/constants/server';

const FilterAdvertise = () => {
    const {t} = useTranslation()
    const [value, setValue] = useState(12000000);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedComforts, setSelectedComforts] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const cottageTypes = ALL_DATA.useCottageType()?.data;
    const regions = ALL_DATA.useRegion()?.data;
    const places = ALL_DATA.usePlaceById(selectedRegion)?.data;
    const comforts = ALL_DATA.useComforts()?.data;
    const cottageType = ['c23f5e39-c51e-4135-9c45-9142924b008f', 'c4c301b1-4719-499e-bde2-2c36715fae9e', '3e54eff7-8a26-443b-a302-066cbe8a05ff']
    const cottageTypeSelectChart = cottageTypes?.filter((el:cottageType) => cottageType.includes(el.id))
    const [moreInfo, setMoreInfo] = useState(5)
    const isAllShown = moreInfo >= comforts?.length
    return (
        <Dialog>
            <DialogTrigger className='md:hidden'><ListFilter size={25}/></DialogTrigger>
            <DialogContent className='filter-modal max-h-[80vh] overflow-y-auto'>
                <DialogHeader className='text-start'>
                    <DialogTitle>{t('filtr')}</DialogTitle>
                    <DialogDescription>Ma`lumotlarni filterlash</DialogDescription>
                </DialogHeader>
                <div className="">
                <p>Narx bo`ych</p>
                    <div className="w-[250px] flex flex-col items-center gap-6 p-4">
                        <div className="flex justify-between text-sm w-[250px]">
                            <span>500,000 sum</span>
                            <span>{value.toLocaleString()} sum</span>
                        </div>
                        <Slider
                            defaultValue={[value]}
                            min={500000}
                            max={12000000}
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
                    <Separator className="my-2"/>
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
                        <Separator className="my-2"/>
                        <p className="py-1 font-medium">{t('camforts')}</p>
                        <div className="flex flex-col space-y-1">
                            {comforts?.slice(0, moreInfo)?.map((e:comfort) => (
                                <label key={e.id} className="flex items-center gap-2">
                                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" value={e.id} onChange={(ev) => {
                                        setSelectedComforts(prev => ev.target.checked ? [...prev, e.id] : prev.filter(id => id !== e.id));
                                    }} />
                                    <Image className="bg-white rounded-sm" width={20} height={20} src={`${IMG_BASE_URL}${e.image}`} alt={e.name} />
                                    <p className="line-clamp-1">{e.name}</p>
                                </label>
                            ))}
                            {!isAllShown && (
                                <button className="flex gap-x-1 justify-center items-center" onClick={() => setMoreInfo(comforts.length)}>Ko`proq ko`rish <ChevronDown/></button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FilterAdvertise;