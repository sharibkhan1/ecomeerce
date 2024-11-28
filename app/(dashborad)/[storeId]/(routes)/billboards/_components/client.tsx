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
  description="
    - If the name is 'PHome' or 'Home', it corresponds to the homepage (for both phone and large devices).
    - If the name is 'PHome2' or 'Home2', it corresponds to the mid-page (for both phone and large devices).
    - If the name is 'PHome3', 'Home3', 'PHome4', or 'Home4', it corresponds to the last page (for both phone and large devices).
    - 'P' means the name is designed for phone screens, and the absence of 'P' means it's for larger devices.
  "
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