"use client"
import { FaUser } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "./logout-button"
import { ExitIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "../mode-toggle"
import { Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export const UserButton=()=>{
    const user = useCurrentUser();
const router = useRouter();
    return(
       <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>
                    <FaUser/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:flex md:flex-col hidden">
            <LogoutButton>
                <DropdownMenuItem className="md:flex hidden">
                    <ExitIcon className="h-4 w-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </LogoutButton>
            <DropdownMenuItem onClick={()=>router.push("/setting")} className="md:flex hidden">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                </DropdownMenuItem>
                <div className="md:flex hidden" >
            <ModeToggle/>
                </div>
        </DropdownMenuContent>
       </DropdownMenu>
    )
}