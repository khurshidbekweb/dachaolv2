'use client'

import BreacdCrambs from '@/components/shared/breacd-crambs';
import { ServicesPageLanguage } from '@/constants/language';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { langKey, services } from '@/types';
import React from 'react';
import ServiceCard from './service-card';

const Services = () => {
    const services:services[] = ALL_DATA.useServices()?.data;
    const store = useLanguageStore()
    const language = store.language as keyof langKey;
    
    return (
        <div className='max-w-6xl mx-auto px-3 md:px-1'>
            <div className="min-h-[20vh] flex flex-col items-start justify-end">
                <BreacdCrambs data={[{ slug: '', title: 'Home' }]} page="Services" />
                <h2 className='text-xl md:text-2xl font-createRound'>{ServicesPageLanguage.mainTitle[language]}</h2>                
            </div>
            <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start gap-4">
                {services && services.map((ser: services) => (
                    <ServiceCard key={ser.id} {...ser}/>
                ))}
            </div>
        </div>
    );
};

export default Services;