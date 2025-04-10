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
        <div className="border w-full md:max-w-[400px] h-[600px] relative mt-4 flex flex-col justify-start items-center rounded-md">
            <p className="tarif-name capitalize text-xl text-center my-3">{props.serviceCode}</p>
            <div className="w-[100px] h-[100px] mx-auto rounded-full flex flex-col items-center dark:bg-secondary bg-gray-500 justify-center gap-3 text-white">
                <p className="text-4xl font-createRound ">{props.tarif.days}</p>
                {TariffPageLanguage.day[language]}
            </div>
            <h3 className="text-xl font-workSans font-semibold px-3 text-start">{props?.tarif?.type}</h3>
            <pre className="w-full whitespace-pre-wrap break-words overflow-wrap-anywhere font-workSans px-2 tracking-wide">{props.tarif.description}</pre>
            <TarifActive tariff={props.tarif} id={props.tarif.id} />
        </div>
    );
};

export default TarifCard;