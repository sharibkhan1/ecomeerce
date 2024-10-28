import Elenavbar from "@/components/auth/elenavbar";
import { UserButton } from "@/components/auth/user-button";

export const Navbar=()=>{
    return(
        <nav className="bg-secondary flex justify-between 
        items-center p-4 rounded-xl w-[600px] shadow-sm " >
            <Elenavbar/>
        <UserButton/>
        </nav>
    )
}