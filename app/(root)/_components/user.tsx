import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut, ShieldHalf, Users } from "lucide-react";
import { FaServicestack } from "react-icons/fa";
import { TfiAnnouncement } from 'react-icons/tfi'
import { FaDiagramSuccessor } from 'react-icons/fa6'
import { useRouter } from "next/navigation";

const User = () => {
    const route = useRouter()
    const clearUser = () =>{
        localStorage.clear()
        route.push('/')
        window.location.reload()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost"><CircleUser /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => route.push('/profile')}>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => route.push('/add-new')}>
                            <TfiAnnouncement className="mr-2 h-4 w-4" />
                            <span>E`lonlan qoyish</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => route.push('/my-cottage')}>
                        <ShieldHalf className="mr-2 h-4 w-4" />
                        <span>Mening dachalarim</span>
                        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => route.push('/services')}>
                        <FaServicestack className="mr-2 h-4 w-4" />
                        <span>Services</span>
                        <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaDiagramSuccessor className="mr-2 h-4 w-4" />
                        <span>Foydalangan tariflarim</span>
                        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearUser} className="bg-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-white">Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default User;