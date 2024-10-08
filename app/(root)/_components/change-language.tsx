
import useLanguageStore from "@/components/providers/language-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ALL_DATA } from '@/Query/get_all'
import { language } from "@/types";
import { IMG_BASE_URL } from "@/constants/server";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
const ChangeLanguage = () => {    
    const languages:language[] = ALL_DATA.useLanguage()?.data
    const activeLang = languages && languages.find((lang: language) => lang.code == localStorage.getItem('language'))  
    const {setLanguage} = useLanguageStore()
    const queryClient = useQueryClient();

  const toggleLanguage = (code: string) => {
    localStorage.setItem("language", code);
    setLanguage(code);
    queryClient.invalidateQueries({ type: "all" });
  };

    return (
        <div className="hidden md:block">
            <DropdownMenu>
            <DropdownMenuTrigger type="button">
                <Image src={`${IMG_BASE_URL}${activeLang?.image}`}  alt="active img" width={30} height={40}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    languages && languages.map((lang: language) => (
                        <DropdownMenuItem  key={lang.id}>
                            <Button onClick={() => toggleLanguage(lang.code)} variant={'ghost'} type="button">
                                <Image src={`${IMG_BASE_URL}${lang.image}`} alt={lang.title} width={35} height={40}  />
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