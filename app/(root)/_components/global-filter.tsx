import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { dachaType } from '@/constants';
import { Minus, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import {debounce} from 'lodash'

const GlobalFilter = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [cottage, setCottage] = useState([])
    
    return (
        <Drawer>
            <DrawerTrigger>
                    <DrawerTitle>
                    <div className='hover:bg-blue-400/20 cursor-pointer rounded-sm transition-colors flex items-center gap-2 px-3 py-2'>
                        <span className='hidden md:flex'>Search</span>
                        <Search type='icon'/>
                    </div>
                    </DrawerTitle>
            </DrawerTrigger>
            <DrawerContent aria-describedby=''>
                <DrawerHeader aria-describedby="">
                    <div className="container max-w-6xl mx-auto py-12">
                        <Input className="bg-secondary" placeholder="Type to search blog..."/>
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
                                <Minus/>
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
                                <Minus/>
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