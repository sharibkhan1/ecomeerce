"use client";

import React, { useEffect, useState } from 'react';
import {  FaShoppingBag } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { getCartItemCount } from '@/actions/cartcount';
import { Button } from '../ui/button';

const CartNavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  // Function to fetch the cart item count from the server
  const fetchCartItemCount = async () => {
    const count = await getCartItemCount();
    setCartItemCount(count);
  };

  useEffect(() => {
    setIsMounted(true);

    // Fetch cart count initially
    fetchCartItemCount();

    // Set up polling to update cart count every 5 seconds
    const intervalId = setInterval(() => {
      fetchCartItemCount();
    }, 5000); // Polling interval in milliseconds (5 seconds here)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (!isMounted) {
    return null;
  }
  const isCartPage = pathname === "/cart";

  return (
    <div className='ml-auto flex md:hidden items-center gap-x-4'>
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
