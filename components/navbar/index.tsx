import React from 'react'
import { MainNav } from '../mainnav'
import { currentUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { ModeToggle } from '../mode-toggle'
  
const NavBar = async () => {

  const userId = await currentUserId()
  if(!userId){
    redirect("/auth/login")
  }
  const stores = await db.store.findMany({
    where:{
      userId,
    },
  })
  const currentStore = stores[0]

  return (
    <div className='border-b sticky z-40 top-0 left-0' >
        <div className='flex h-10 items-center px-4 dark:border-white dark:text-white dark:bg-black/90 ' >
        <span className="text-lg font-semibold">{currentStore.name}</span>
            <MainNav/>
            <div className='ml-auto flex items-center space-x-4 ' > 
            <ModeToggle/>
            </div>
        </div>
    </div>
  )
}

export default NavBar