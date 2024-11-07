"use client"

import React from 'react'
import Heading from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface BillBoardClientProps{
  data:BillboardColumn[]
}

const BillBoardClient:React.FC<BillBoardClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
        <div className='flex items-center justify-between ' >
        <Heading
                title={`Billboards (${data.length})`}
                description="Manage billboards for your store"
        />
        <Button onClick={()=> router.push(`/${params.storeId}/billboards/6725fde91242b35561f2727f`)} >
            <PlusIcon className='mr-2 h-4 w-4' />
            Add New
        </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data} />
        <Heading
                title="API"
                description="API call for billboards"
        />
        <Separator/>
        <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}

export default BillBoardClient