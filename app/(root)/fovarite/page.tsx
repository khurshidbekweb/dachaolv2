'use client'

import Dacha from "@/components/card/dacha";
import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ALL_DATA } from "@/Query/get_all";
import { useLikeStore } from "@/store/like-card";
import { cottageTop } from "@/types";

const data = [
    {slug: '/', title:'Home'},
    {slug: 'cottage', title:'Cottage'},
]

const Fovarite = () => {
    const cottages:cottageTop[] = ALL_DATA.useCottageRecommended()?.data
    const {likedCards} = useLikeStore()
    const likeCottage = cottages?.filter(dacha => likedCards.includes(dacha.cottageId))
    
    
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col items-start justify-end">
                <BreacdCrambs data={data} page="Fovarite"/>
                <h2 className="text-2xl md:text-3xl font-createRound">Fovarite Cottage</h2>
            </div>
            <div className="w-full mt-5 flex flex-col md:flex-row md:flex-wrap gap-5">
                {likeCottage?.length ? likeCottage.map((dacha: cottageTop) => (
                    <Dacha key={dacha.id} {...dacha}/>
                )): <p className="border w-[360px] mt-4 border-red-400 p-2 rounded-md text-black bg-yellow-200">Fovarite cottage mavjud emas</p> }
            </div>
        </div>
    );
};

export default Fovarite;