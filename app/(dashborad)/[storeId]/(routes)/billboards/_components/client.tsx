"use client"

import React from 'react'
import Heading from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

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
        <div className='flex items-center  justify-between ' >
        <Heading
                title={`Billboards (${data.length})`}
                description="Home :home page,,,,, Home2  :mid,,,,,,Home3,Home4:last"
        />
        <Button className='dark:shadow-yellow-300' variant="brutal" onClick={()=> router.push(`/${params.storeId}/billboards/673136c6efefd5ac6745b9f6`)} >
            <PlusIcon className='mr-2 h-4 w-4 ' />
            Add New
        </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data} />
        {/* <Heading
                title="API"
                description="API call for billboards"
        />
        <Separator/>
        <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  )
}

export default BillBoardClient