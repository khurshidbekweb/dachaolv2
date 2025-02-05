import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut, ShieldHalf, Users } from "lucide-react";
import { FaServicestack } from "react-icons/fa";
import { TfiAnnouncement } from 'react-icons/tfi'
import { FaDiagramSuccessor } from 'react-icons/fa6'
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { safeLocalStorage } from "@/utils/safeLocalstorge";

const User = () => {
    const {t} = useTranslation()
    const accessToken = safeLocalStorage.getItem('accessToken')
    const handleLogOut = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost"><CircleUser /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={'/profile'} className="flex gap-x-[2px] items-center w-full">
                            <Users className="mr-2 h-4 w-4" />
                            <span>{t('nav_profile')}</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                            <Link href={'/add-new'}  className="flex gap-x-[2px] items-center w-full">
                                <TfiAnnouncement className="mr-2 h-4 w-4" />
                                <span>{t("profile_e'lonlar")}</span>
                            </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/my-cottage'} className="flex gap-x-[2px] items-center w-full">
                                <ShieldHalf className="mr-2 h-4 w-4" />
                                <span>{t("profile_dachalarim")}</span>
                            </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/services'}  className="flex gap-x-[2px] items-center w-full">
                            <FaServicestack className="mr-2 h-4 w-4" />
                            <span>{t("profile_service")}</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/'} className="flex gap-x-[2px] items-center w-full">
                            <FaDiagramSuccessor className="mr-2 h-4 w-4" />
                            <span>{t("profile_tariff")}</span>
                        </Link>
                    </DropdownMenuItem>
                    <Separator/>
                    {accessToken && <DropdownMenuItem onClick={handleLogOut} className="flex gap-x-[2px] cursor-pointer items-center w-full bg-red-500 mt-3 hover:bg-red-700 hover:text-white">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>{t("logout")}</span>
                    </DropdownMenuItem>}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default User;