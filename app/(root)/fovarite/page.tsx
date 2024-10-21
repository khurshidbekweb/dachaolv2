import BreacdCrambs from "@/components/shared/breacd-crambs";
import MiniNav from "@/components/shared/mini-nav";
import LikeCard from "./like-card";
import { Metadata } from "next";
const data = [
    {slug: '', title:'Home'},
    {slug: 'cottage', title:'Cottage'},
]

export const metadata: Metadata = {
    title: "Fovarite | DachaOL",
}

const Fovarite = () => {       
    return (
        <>
            <div className="max-w-6xl mx-auto px-3 md:px-1">
                <div className="min-h-[20vh] flex flex-col items-start justify-end">
                    <BreacdCrambs data={data} page="Fovarite"/>
                    <h2 className="text-2xl md:text-3xl font-createRound">Fovarite Cottage</h2>
                </div>
                <LikeCard/>
            </div>
            <MiniNav/>
        </>
    );
};

export default Fovarite;