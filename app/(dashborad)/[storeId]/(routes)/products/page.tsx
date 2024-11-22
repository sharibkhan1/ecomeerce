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
      size1:true,
      size2:true,
      size3:true,
      color:true,
      color1:true,
      color2:true,
      color3:true,
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
    dilevery:item.dilevery|| "",
    size:item.size.value,
    size1:item.size1?.value|| "",
    size2:item.size2?.value|| "",
    size3:item.size3?.value|| "",
    color:item.color.value,
    color1:item.color1?.value|| "",
    color2:item.color2?.value|| "",
    color3:item.color3?.value|| "",
    createdAt:format(item.createdAt,"MMMM do, yyyy"),
    discription:item.discription,
    salesPrice:formatter.format(item.salesPrice),
  stocks: String(item.stocks), // Convert number to string
  }));

  return (
    <div className='flex-col dark:bg-muted-foreground min-h-screen flex' >
        <div className='flex-1 space-y-4 p-8 pt-6 ' >
            <ProductClient data={formattedProducts} />
        </div>
    </div>
  )
}

export default Productpage