"use client"

import React from 'react'
import Heading from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { SizeColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface SizesClientProps{
  data:SizeColumn[]
}

const SizesClient:React.FC<SizesClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
        <div className='flex items-center justify-between ' >
        <Heading
                title={`Sizes (${data.length})`}
                description="Manage sizes for your store"
        />
        <Button className='dark:shadow-yellow-300' variant="brutal"  onClick={()=> router.push(`/${params.storeId}/sizes/673136c6efefd5ac6745b9f6`)} >
            <PlusIcon className='mr-2 h-4 w-4' />
            Add New
        </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data} />
        {/* <Heading
                title="API"
                description="API call for sizes"
        />
        <Separator/>
        <ApiList entityName="sizes" entityIdName="sizeId" /> */}
    </>
  )
}

export default SizesClient