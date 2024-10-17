'use client'

import Dacha from "@/components/card/dacha";
import BreacdCrambs from "@/components/shared/breacd-crambs";
import { ALL_DATA } from "@/Query/get_all";
import { cottage } from "@/types";
import { useParams } from "next/navigation";

const Announcements = () => {
    const params = useParams()    
    const userCottage = ALL_DATA.useCottageAllUserId(params.id)?.data;
    
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col items-start justify-end">
                <BreacdCrambs data={[{ slug: '', title: 'Home'},{ slug: 'cottage', title: 'Cottage'}]} page="Announcements"/>
                <h2 className="text-2xl md:text-3xl font-createRound">User Cottage</h2>
            </div>
            <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {userCottage && userCottage.map((dacha: cottage) => (
                    <Dacha key={dacha.id} {...dacha}/>
                ))}
            </div>
        </div>
    );
};

export default Announcements;