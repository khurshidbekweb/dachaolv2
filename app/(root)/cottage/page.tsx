import BreacdCrambs from "@/components/shared/breacd-crambs";

const CottageAll = () => {
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="Cottage"/>
                <h2>Cottage</h2>
            </div>
        </div>
    );
};

export default CottageAll;