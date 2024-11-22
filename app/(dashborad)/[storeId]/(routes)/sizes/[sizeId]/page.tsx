
import db from '@/lib/db'
import React from 'react'
import { SizeForm } from '../_components/size-form';

const SizePage = async({
    params
}:{
    params:{sizeId: string}
}) => {
    const size = await db.size.findUnique({
        where:{
            id:params.sizeId
        }
    });
  return (
    <div className='flex-col bg-muted-foreground min-h-screen flex ' >
        <div className='flex-1 spce-y-4 p-8 pt-6 ' >
            <SizeForm initialData={size}/>
        </div>
    </div>
  )
}

export default SizePage