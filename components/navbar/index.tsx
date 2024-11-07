import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { MainNav } from '../mainnav'
import StoreSwitcher from '../store-switcher'
import { currentUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
  
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
  return (
    <div className='border-b' >
        <div className='flex h-10 items-center px-4 ' >
            <StoreSwitcher items={stores} />
            <MainNav/>
            <div className='ml-auto flex items-center space-x-4 ' >
              
            <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar> 
            </div>
        </div>
    </div>
  )
}

export default NavBar