import { ServicesPageLanguage } from "@/constants/language";
import { IMG_BASE_URL } from "@/constants/server";
import useLanguageStore from "@/store/language-provider";
import { langKey, services } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = (props: services) => {
    const store = useLanguageStore()
    const language = store.language as keyof langKey
    
    return (
        <div className="services-card relative w-full md:max-w-[300px] h-[350px] rounded-md overflow-hidden shadow-lg border flex flex-col items-start justify-start">
            <Image
                src={`${IMG_BASE_URL}${props.images[0]}`}
                alt={props.name}
                className="w-full h-[180px]"
                sizes="(min-width: 150px)"
                width={150}
                height={100}
            />
            <hr />
            <div className="px-2">
                <h4 className="text-xl font-medium capitalize">{props.name}</h4>
                <p className="services-card-description">{props.description}</p>
                <Link className="bg-secondary text-black w-[95%] font-medium text-center absolute bottom-2 dark:text-white p-[6px] px-5 rounded-md" href={`/services/${props.id}`}>
                    {ServicesPageLanguage.viewTariff[language]}
                </Link>                
            </div>
        </div>
    );
};

export default ServiceCard;