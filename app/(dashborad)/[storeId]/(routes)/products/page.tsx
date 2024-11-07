import React from 'react'
import ProductClient from './_components/client'
import db from '@/lib/db'
import { ProductColumn } from './_components/columns'
import {format} from "date-fns";
import { formatter } from '@/lib/utils';

const Productpage = async({
  params
}:{
  params:{storeId:string}
}) => {
  const products = await db.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true,
      size:true,
      color:true,
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  const formattedProducts: ProductColumn[]= products.map((item)=>({
    id:item.id,
    name:item.name,
    isFeatured:item.isFeatured,
    isArchived:item.isArchived,
    price:formatter.format(item.price),
    category: item.category.name,
    size:item.size.name,
    color:item.color.value,
    createdAt:format(item.createdAt,"MMMM do, yyyy"),
    discription:item.discription,
    salesPrice:formatter.format(item.salesPrice),
  stocks: String(item.stocks), // Convert number to string
  }));

  return (
    <div className='flex-col' >
        <div className='flex-1 space-y-4 p-8 pt-6 ' >
            <ProductClient data={formattedProducts} />
        </div>
    </div>
  )
}

export default Productpage