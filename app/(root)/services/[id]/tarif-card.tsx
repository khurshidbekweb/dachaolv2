import TarifActive from "@/components/shared/tarif-active";
import { TariffPageLanguage } from "@/constants/language";
import useLanguageStore from "@/store/language-provider";
import { langKey, tariff } from "@/types";

interface Props {
    tarif: tariff,
    serviceCode: string
}

const TarifCard = (props: Props) => {
    const store = useLanguageStore()
    const language = store.language as keyof langKey
    return (
        <div className="border w-full md:max-w-[350px] h-[350px] relative mt-4 flex flex-col justify-start items-center rounded-md">
            <p className="tarif-name capitalize text-xl text-center my-3">{props.serviceCode}</p>
            <div className="w-[100px] h-[100px] mx-auto rounded-full flex flex-col items-center bg-secondary justify-center gap-3">
                <p className="text-4xl font-createRound">{props.tarif.days}</p>
                {TariffPageLanguage.day[language]}
            </div>
            <p className="line-clamp-3">{props.tarif.description}</p>
            <TarifActive tariff={props.tarif} id={props.tarif.id} />
        </div>
    );
};

export default TarifCard;