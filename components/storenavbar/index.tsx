import React from 'react'
import Link from 'next/link'
import MainNav from '../main-nav'
import getCategories from '@/actions/get-categories'
import NavbarAction from '../navbaraction'
import Sidebar from './Sidebar'
import CartNavbarAction from './cartmain'

const StoreNavBar = async () => {
    const categories = await getCategories();

  return (
    <div className='border-b sticky top-0 left-0 z-50 bg-black/90 ' >
            <div className='relative px-4 sm:px-6 lg:px-8 hidden  lg:flex h-16 items-center ' >
                <Link href="/" className='ml-4 flex lg:ml-0 gap-x-2 ' >
                    <p className='font-bold text-yellow-300 text-xl' >STORE</p>
                </Link>
                <MainNav data={categories} />
                <NavbarAction/>
            </div>
            <div className='relative px-4 sm:px-6 lg:px-8 lg:hidden flex h-16 items-center justify-between ' >
                <Link href="/" className='ml-4 flex lg:ml-0 z-50 gap-x-2 ' >
                    <p className='font-bold text-xl text-yellow-300' >STORE</p>
                </Link>
                <CartNavbarAction/>
                <Sidebar categories={categories} />
            </div>
    </div>
  )
}

export default StoreNavBar