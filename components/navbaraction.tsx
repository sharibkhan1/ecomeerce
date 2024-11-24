"use client";

import React, { useEffect, useState } from 'react';
import { FaShoppingCart , FaShoppingBag } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { useCurrentRole } from '@/hooks/use-current-role';
import { Button } from './ui/button';
import { UserButton } from './auth/user-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCartStore } from '@/hooks/cartstore';

const NavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cartItemCount = useCartStore((state) => state.cartCount); // Access the cart item count from Zustand store
  const router = useRouter();
  const role = useCurrentRole(); // Get the current user's role
  const pathname = usePathname(); // Get the current route

  // Function to fetch the cart item count from the server
  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted before rendering
  }, []);
  if (!isMounted) {
    return null;
  }
  const storeId = "673136c6efefd5ac6745b9f6";
  const handleRoleNavigation = () => {
    if (role === 'ADMIN') {
      router.push(`/${storeId}/admin`);
    } else if (role === 'MAINADMIN') {
      router.push(`/${storeId}/`);
    }
  };
  const isCartPage = pathname === "/cart";
  const isMyOrderPage = pathname === "/myorder";
  return (
    <div className='ml-auto flex flex-col md:flex-row items-center gap-x-4'>
            <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
<Button
        variant="brutal"
        onClick={() => router.push("/cart")}
        className={`md:flex hover:bg-white shadow-white dark:hover:shadow-none hover:shadow-none hidden items-center rounded-full px-4 py-2 ${
          isCartPage ? 'bg-yellow-300 text-black shadow-white' : 'bg-white '
        }`}
      >
                <FaShoppingBag size={20} color='black' />
        <span className='ml-2 text-sm font-medium text-black'>
          {cartItemCount}
        </span>
      </Button>
      </TooltipTrigger>
          <TooltipContent>
            <p>Cart</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
        <TooltipTrigger>
      <Button
        variant="brutal"
        onClick={() => router.push("/myorder")}
        className={`flex mb-5 hover:bg-white md:mb-0 shadow-white dark:hover:shadow-none hover:shadow-none items-center rounded-full px-4 py-2 ${
          isMyOrderPage ? 'bg-yellow-300 text-black shadow-white ' : 'bg-white'
        }`}
      >
                <FaShoppingCart  size={20} color='black' />
      </Button>
      </TooltipTrigger>
          <TooltipContent>
            <p>My Orders</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      { role!=="USER" && role && (
        <Button variant="stretch" onClick={handleRoleNavigation} className='flex items-center border-2 border-black hover:bg-yellow-300 rounded-full px-4 py-2'>
          {role === 'ADMIN' ? 'Admin' : role === 'MAINADMIN' ? 'Main Admin' : ''}
        </Button>
      )}
       <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <UserButton />
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* <Button onClick={()=>router.push("/settings")} >Set</Button> */}
    </div>
  );
};

export default NavbarAction;
