import React from 'react'
import BillBoardClient from './_components/client'
import db from '@/lib/db'
import { OrderColumn } from './_components/columns'
import {format} from "date-fns";
import { formatter } from '@/lib/utils';

const Ordersdpage = async({
  params
}:{
  params:{storeId:string}
}) => {
  const orders = await db.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      orderItems:{
        include:{
          product:true
        }
      }
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  const formattedOrders: OrderColumn[]= orders.map((item)=>({
    id:item.id,
    phone:item.phone,
    address:item.address,
    products:item.orderItems.map((orderItem)=>orderItem.product.name).join(', '),
    isPaid: item.isPaid,
    totalPrice: formatter.format(item.orderItems.reduce((total,item)=>{
      return total + Number(item.product.price)
    },0)),
    createdAt:format(item.createdAt,"MMMM do, yyyy")
  }));

  return (
    <div className='flex-col' >
        <div className='flex-1 space-y-4 p-8 pt-6 ' >
            <BillBoardClient data={formattedOrders} />
        </div>
    </div>
  )
}

export default Ordersdpage