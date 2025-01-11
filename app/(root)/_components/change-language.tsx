
import useLanguageStore from "@/store/language-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ALL_DATA } from '@/Query/get_all'
import { language } from "@/types";
import { IMG_BASE_URL } from "@/constants/server";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {safeLocalStorage} from '@/utils/safeLocalstorge'
import { useTranslation } from "react-i18next";
const ChangeLanguage = () => {   
    const {i18n} = useTranslation()
    const languages:language[] = ALL_DATA.useLanguage()?.data
    const activeLang = languages && languages.find((lang: language) => lang.code == safeLocalStorage.getItem('language'))  
      
    const {setLanguage} = useLanguageStore()
    const queryClient = useQueryClient();

  const toggleLanguage = (code: string) => {
        safeLocalStorage.setItem("language", code);
        setLanguage(code);
        i18n.changeLanguage(code)
        queryClient.invalidateQueries({ type: "all" });
  };

    return (
        <div className="block">
            <DropdownMenu>
            <DropdownMenuTrigger type="button" className="outline-none">
                <Image className="mb-[-3px]" src={`${IMG_BASE_URL}${activeLang?.image}`} sizes="35px" alt="language" width={30} height={40}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    languages && languages.map((lang: language) => (
                        <DropdownMenuItem  key={lang.id}>
                            <Button className="flex items-center gap-2 p-0" onClick={() => toggleLanguage(lang.code)} variant={'ghost'} type="button">
                                <Image src={`${IMG_BASE_URL}${lang.image}`} sizes="35px" alt={lang.title} width={35} height={40}  />
                                <p>{lang?.title}</p>
                            </Button>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    );
};

export default ChangeLanguage;