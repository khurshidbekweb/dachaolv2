/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Loader, Minus, Search } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash'
import { ALL_DATA } from '@/Query/get_all';
import { cn } from '@/lib/utils';
import SearchCard from '@/components/card/search-card';
import { cottage, cottageType, place } from '@/types';
import { useTranslation } from 'react-i18next';

const GlobalFilter = () => {
    const [searchText, setSearchText] = useState('');
    const { data, isLoading } = ALL_DATA?.useSearchCottage(searchText);
    const { data: place } = ALL_DATA.usePlace()
    const {data: cottageType} = ALL_DATA.useCottageType()
    const {t} = useTranslation()

    const debouncedSearch = debounce((value: string) => setSearchText(value), 400);
    const handleSearchCottage = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase()
        debouncedSearch(text)
    }
    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, [searchText]);

    return (
        <Drawer>
            <DrawerTrigger>
                <DrawerTitle>
                    <div className='hover:bg-blue-400/20 cursor-pointer rounded-sm transition-colors flex items-center gap-2 px-3 py-2'>
                        <span className='hidden md:flex'>{t('profile_search')}</span>
                        <Search type='icon' />
                    </div>
                </DrawerTitle>
            </DrawerTrigger>
            <DrawerContent aria-describedby=''>
                <DrawerHeader aria-describedby="">
                    <div className="container max-w-6xl mx-auto py-12">
                        <Input onChange={handleSearchCottage} className="bg-secondary" placeholder="E'lonlarni qidirish..." />
                        {isLoading ? <Loader className='animate-spin mx-auto w-4 h-4' /> : <p className='text-start'>{data?.length ? data?.length + ' - natija' : ''}</p>}
                        <div className={cn('grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2')}>
                            {data?.length && data.map((dacha: cottage) => (
                                <SearchCard key={dacha.id} dacha={dacha} />
                            ))}
                        </div>
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};

export default GlobalFilter;