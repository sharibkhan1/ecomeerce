"use client";

import React, { useEffect, useState } from 'react';
import {  FaShoppingBag } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useCartStore } from '@/hooks/cartstore';

const CartNavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cartItemCount = useCartStore((state) => state.cartCount); // Access the cart item count from Zustand store
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted before rendering
  }, []);
  if (!isMounted) {
    return null;
  }
  const isCartPage = pathname === "/cart";

  return (
    <div className='ml-auto flex lg:hidden items-center gap-x-4'>
      <Button variant="brutal" onClick={() => router.push("/cart")} className={`flex bg-yellow-300 items-center rounded-full px-4 py-2${
          isCartPage ? 'bg-yellow-300 text-black' : 'bg-white'
        }`}>
        <FaShoppingBag size={20} color='black' />
        <span className='ml-2 text-sm font-medium text-black'>
          {cartItemCount}
        </span>
      </Button>
    </div>
  );
};

export default CartNavbarAction;
