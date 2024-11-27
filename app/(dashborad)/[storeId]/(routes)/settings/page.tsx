import { currentUserId } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { SettingsForm } from './_components/settings-form'

interface SettingsPageProps{
    params:{
        storeId:string
    }
}

const Settings:React.FC<SettingsPageProps> = async ({params}) => {

  const userId =await currentUserId()

  if(!userId){
    redirect("/auth/login");
  }
  const store = await db.store.findFirst({
    where:{
      id:params.storeId,
      userId
    }
  });
  if(!store){
    redirect("/mainAdmin/")
  }

  return (
    <div className='flex-col min-h-screen flex dark:bg-[#09090B]' >
      <div className='flex-1 space-y-4 p-8 pt-6 ' >
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default Settings