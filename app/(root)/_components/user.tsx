import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut, ShieldHalf, Users } from "lucide-react";
import { FaServicestack } from "react-icons/fa";
import {TfiAnnouncement} from 'react-icons/tfi'
import {FaDiagramSuccessor} from 'react-icons/fa6'

const User = () => {
    return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"><CircleUser/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>              
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>         
          <DropdownMenuItem>
            <TfiAnnouncement className="mr-2 h-4 w-4" />
            <span>Mening e'lonlarim</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShieldHalf className="mr-2 h-4 w-4" />
            <span>Mening dachalarim</span>
            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
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
        <DropdownMenuItem className="bg-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    );
};

export default User;