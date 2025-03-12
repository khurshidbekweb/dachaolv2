/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Loader, Search } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash'
import { ALL_DATA } from '@/Query/get_all';
import { cn } from '@/lib/utils';
import { cottage} from '@/types';
import { useTranslation } from 'react-i18next';
import Dacha from '@/components/card/dacha';

const GlobalFilter = () => {
    const [searchText, setSearchText] = useState('');
    const { data, isLoading } = ALL_DATA?.useSearchCottage(searchText);
    const [start,setStart] = useState('')
    const {t} = useTranslation()

    const debouncedSearch = debounce((value: string) => setSearchText(value), 400);
    const handleSearchCottage = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase()
        setStart(text)
        debouncedSearch(text)
    }
    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, [searchText]);

    return (
        <Drawer>
            <DrawerTrigger>
                <DrawerTitle>
                    <div className='hover:bg-blue-400/20 cursor-pointer rounded-sm transition-colors flex items-center gap-2 px-3 py-1'>
                        <span className='hidden md:flex'>{t('profile_search')}</span>
                        <Search type='icon' />
                    </div>
                </DrawerTitle>
            </DrawerTrigger>
            <DrawerContent aria-describedby='' className='w-full h-[400px] md:h-[600px]'>
                <DrawerHeader aria-describedby="">
                    <div className="container max-w-6xl mx-auto">
                        <div className="fixed w-full top-10 h-[90px] left-1/2 transform -translate-x-1/2 max-w-6xl px-4 md:px-0">
                            <Input onChange={handleSearchCottage} className="bg-secondary w-full" placeholder={t('search_plesholder')} />
                            {isLoading ? <Loader className='animate-spin mx-auto w-7 h-7 mt-5' /> : <p className='text-start font-createRound mt-1 text-[18px]'>{data?.length ? data?.length + t('result') : ''}</p>}
                        </div>
                        <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full global-search overflow-y-auto max-h-[290px] md:max-h-[470px] mt-20 md:mt-[70px]')}>
                            {data?.length ? data.map((dacha: cottage) => (
                                <Dacha key={dacha.id} {...dacha} />
                            ))
                            : !start  ?
                                <p className='border text-start w-[360px] mt-4 border-blue-400 p-2 rounded-md text-white bg-green-400'>{t('search_advertes')}</p>
                                :
                                <p className='border text-start w-[360px] mt-4 border-red-400 p-2 rounded-md text-black bg-yellow-200'>{t('search_no_result')}</p>
                            }
                        </div>
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};

export default GlobalFilter;