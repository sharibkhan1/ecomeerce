"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Elenavbar = () => {
    const pathname = usePathname();

  return (
    <div className="flex gap-x-2" >
    <Button
        asChild
        variant={pathname === "/settings" ? "default": "outline"}
    >
        <Link href="/settings" >
            Settings
        </Link>
    </Button>
    <Button
        asChild
        variant={pathname === "/client" ? "default": "outline"}
    >
        <Link href="/client" >
        Client
        </Link>
    </Button>
    <Button
        asChild
        variant={pathname === "/admin" ? "default": "outline"}
    >
        <Link href="/admin" >
        Admin
        </Link>
    </Button>
    <Button
        asChild
        variant={pathname === "/server" ? "default": "outline"}
    >
        <Link href="/server" >
        Server
        </Link>
    </Button>

</div>
  )
}

export default Elenavbar