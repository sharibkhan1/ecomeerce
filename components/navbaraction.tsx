"use client"

import React, { useEffect, useState } from 'react'
import Buttons from './ui/Buttons'
import { FaFirstOrder, FaShoppingBag } from 'react-icons/fa'
import useCart from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'

const NavbarAction = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    const cart =useCart();
    const router = useRouter();

    if(!isMounted){
        return null;
    }
  return (
    <div className='ml-auto flex items-center gap-x-4 ' >
        <Buttons onClick={()=>router.push("/cart")} className='flex items-center rounded-full bg-black px-4 py-2 ' >
            <FaShoppingBag size={20} color='white' />
            <span className='ml-2 text-sm font-medium text-white ' >
                {cart.items.length}</span>
        </Buttons>
        <Buttons onClick={()=>router.push("/myorder")} className='flex items-center rounded-full bg-black px-4 py-2 ' >
            <FaFirstOrder size={20} color='white' />
            <span className='ml-2 text-sm font-medium text-white ' >
                Orders</span>
        </Buttons>
    </div>
  )
}

export default NavbarAction