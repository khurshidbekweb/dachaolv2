'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ALL_DATA } from "@/Query/get_all";
import { place } from "@/types";
import PlaceCard from "./place-card";

const Place = () => {
    const places:place[] = ALL_DATA.usePlace()?.data;
    console.log(places);
    
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="Place"/>
                <h2 className='text-2xl md:text-3xl font-createRound'>All Place</h2>
            </div>
            <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mx-auto">
                {places && places?.map(place => <PlaceCard key={place.id} {...place}/>)}
            </div>
        </div>
    );
};

export default Place;