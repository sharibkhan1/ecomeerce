
import db from '@/lib/db'
import React from 'react'
import { CategoryForm } from '../_components/category-form';

const CategoryPage = async({
    params
}:{
    params:{categoryId: string,storeId:string}
}) => {
    const category = await db.category.findUnique({
        where:{
            id:params.categoryId
        }
    });

    const billboards = await db.billboard.findMany({
        where:{
            storeId:params.storeId
        }
    })
  return (
    <div className='flex-col dark:bg-[#09090B] min-h-screen flex' >
        <div className='flex-1 spce-y-4 p-8 pt-6 ' >
            <CategoryForm initialData={category} billboards={billboards} />
        </div>
    </div>
  )
}

export default CategoryPage