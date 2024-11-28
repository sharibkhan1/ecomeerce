"use client"

import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation"

interface MainNavProps{
    data:Category[];
};

const MainNav:React.FC<MainNavProps>=({
    data
})=>{
    const pathname=usePathname();
    const routes= data.map((route)=>({
        href:`/category/${route.id}`,
        label:route.name,
        active:pathname === `/category/${route.id}`
    }));

    return(
        <nav className="flex lg:ml-4 mt-5 items-center flex-col lg:flex-row sm:space-x-4 lg:space-x-6 text-base sm:text-lg font-medium">
             {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            " border-2 border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 items-center text-center min-w-[9rem] lg:min-w-[5rem] py-2 mb-4 rounded-2xl self-start lg:self-auto",
            route.active
              ? "bg-yellow-400 text-black font-bold shadow-white shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
              : "text-gray-800 hover:text-black hover:bg-white hover:shadow-yellow-400"
          )}
        >
          {route.label}
        </Link>
      ))}
        </nav>
    )
}
export default MainNav;