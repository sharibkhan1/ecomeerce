"use client";

import React, { useEffect, useState } from 'react';
import Buttons from './ui/Buttons';
import { FaFirstOrder, FaShoppingBag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { getCartItemCount } from '@/actions/cartcount';

const NavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const router = useRouter();

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

  return (
    <div className='ml-auto flex items-center gap-x-4'>
      <Buttons onClick={() => router.push("/cart")} className='flex items-center rounded-full bg-black px-4 py-2'>
        <FaShoppingBag size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>
          {cartItemCount}
        </span>
      </Buttons>
      <Buttons onClick={() => router.push("/myorder")} className='flex items-center rounded-full bg-black px-4 py-2'>
        <FaFirstOrder size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>
          Orders
        </span>
      </Buttons>
    </div>
  );
};

export default NavbarAction;
