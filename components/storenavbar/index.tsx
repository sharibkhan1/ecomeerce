import React from 'react'
import Cont from '../ui/cont'
import Link from 'next/link'
import MainNav from '../main-nav'
import getCategories from '@/actions/get-categories'
import NavbarAction from '../navbaraction'

const StoreNavBar = async () => {
    const categories = await getCategories();

  return (
    <div className='border-b' >
        <Cont>
            <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center ' >
                <Link href="/" className='ml-4 flex lg:ml-0 gap-x-2 ' >
                    <p className='font-bold text-xl' >STORE</p>
                </Link>
                <MainNav data={categories} />
                <NavbarAction/>
            </div>
        </Cont>
    </div>
  )
}

export default StoreNavBar