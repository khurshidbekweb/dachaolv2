/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { dachaType } from '@/constants';
import { Loader, Minus, Search } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash'
import { ALL_DATA } from '@/Query/get_all';
import { cn } from '@/lib/utils';

const GlobalFilter = () => {
    const [searchText, setSearchText] = useState('');
    const { data, isLoading } = ALL_DATA?.useSearchCottage(searchText);

    const debouncedSearch = debounce((value: string) => setSearchText(value), 400);
    const handleSearchCottage = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase()
        debouncedSearch(text)
    }
    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, []);
    console.log(data);
    
    return (
        <Drawer>
            <DrawerTrigger>
                <DrawerTitle>
                    <div className='hover:bg-blue-400/20 cursor-pointer rounded-sm transition-colors flex items-center gap-2 px-3 py-2'>
                        <span className='hidden md:flex'>Search</span>
                        <Search type='icon' />
                    </div>
                </DrawerTitle>
            </DrawerTrigger>
            <DrawerContent aria-describedby=''>
                <DrawerHeader aria-describedby="">
                    <div className="container max-w-6xl mx-auto py-12">
                        <Input onChange={handleSearchCottage} disabled={isLoading} className="bg-secondary" placeholder="E'lonlarni qidirish..." />
                        {isLoading ? <Loader className='animate-spin mx-auto w-4 h-4'/> : <p className='text-start'>{data?.length?data?.length+' - natija':''}</p> }
                        <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2', data?'':'')}></div>
                        <div className='flex flex-col space-y-2 mt-4'>
                            <p className='font-creteRound text-2xl text-start'>See posts by categories</p>
                            <div className="flex items-center gap-x-3">
                                <div className='flex flex-wrap gap-2'>
                                    {dachaType.map(item => (
                                        <Badge key={item.id} variant={'secondary'}>
                                            {item.name}
                                        </Badge>
                                    ))}
                                </div>
                                <Minus />
                                <Link href={'/category'} className="text-blue-500 underline">
                                    <DrawerClose>
                                        See all
                                    </DrawerClose>
                                </Link>
                            </div>
                        </div>

                        <div className='flex flex-col space-y-2 mt-4'>
                            <p className='font-creteRound text-2xl text-start'>See posts by tags</p>
                            <div className="flex items-center gap-x-3">
                                <div className='flex flex-wrap gap-2'>
                                    {dachaType.map(item => (
                                        <Badge key={item.id} variant={'secondary'}>
                                            {item.name}
                                        </Badge>
                                    ))}
                                </div>
                                <Minus />
                                <Link href={'/tags'} className="text-blue-500 underline">
                                    <DrawerClose>
                                        See all
                                    </DrawerClose>
                                </Link>
                            </div>
                        </div>

                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};

export default GlobalFilter;