import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut, ShieldHalf, Users } from "lucide-react";
import { FaServicestack } from "react-icons/fa";
import { TfiAnnouncement } from 'react-icons/tfi'
import { FaDiagramSuccessor } from 'react-icons/fa6'
import { useRouter } from "next/navigation";
import Link from "next/link";

const User = () => {
    const route = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost"><CircleUser /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={'/profile'} className="flex justify-between items-center w-full">
                            <Users className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                            <Link href={'/add-new'}  className="flex justify-between items-center w-full">
                                <TfiAnnouncement className="mr-2 h-4 w-4" />
                                <span>E`lonlan qoyish</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/my-cottage'} className="flex justify-between items-center w-full">
                            <ShieldHalf className="mr-2 h-4 w-4" />
                            <span>Mening dachalarim</span>
                            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut></Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/services'}  className="flex justify-between items-center w-full">
                            <FaServicestack className="mr-2 h-4 w-4" />
                            <span>Services</span>
                            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/'} className="flex justify-between items-center w-full">
                            <FaDiagramSuccessor className="mr-2 h-4 w-4" />
                            <span>Foydalangan tariflarim</span>
                            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default User;