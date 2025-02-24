'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ALL_DATA } from "@/Query/get_all";
import { place } from "@/types";
import PlaceCard from "./place-card";
import MiniNav from "@/components/shared/mini-nav";

const Place = () => {
    const places:place[] = ALL_DATA.usePlace()?.data;    
    return (
            <>
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="Cottage type"/>
                <h2 className='text-2xl md:text-3xl font-createRound'>All Cottage type</h2>
            </div>
            <div className="w-full mt-5 flex items-center flex-wrap gap-2 md:gap-4 justify-between px-1">
                {places && places?.map(place => <PlaceCard key={place.id} {...place}/>)}
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default Place;