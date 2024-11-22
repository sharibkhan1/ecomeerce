import React from 'react'
import ColorClient from './_components/client'
import db from '@/lib/db'
import { ColorColumn } from './_components/columns'
import {format} from "date-fns";

const ColorsPage = async({
  params
}:{
  params:{storeId:string}
}) => {
  const color = await db.color.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  const formattedColors: ColorColumn[]= color.map((item)=>({
    id:item.id,
    name:item.name,
    value:item.value,
    createdAt:format(item.createdAt,"MMMM do, yyyy")
  }));

  return (
    <div className='flex-col dark:bg-muted-foreground min-h-screen flex' >
        <div className='flex-1 space-y-4 p-8 pt-6 ' >
            <ColorClient data={formattedColors} />
        </div>
    </div>
  )
}

export default ColorsPage