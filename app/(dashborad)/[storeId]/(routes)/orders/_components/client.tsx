"use client"

import React from 'react'
import Heading from "@/components/ui/heading";
import { Separator } from '@/components/ui/separator';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface BillBoardClientProps{
  data:OrderColumn[]
}

const OrderClient:React.FC<BillBoardClientProps> = ({
  data
}) => {
  return (
    <>
        <Heading
                title={`Order (${data.length})`}
                description="Manage orders for your store"
        />
        <Separator/>
        <DataTable searchKey2='status' searchKey="products" columns={columns} data={data} />
    </>
  )
}

export default OrderClient