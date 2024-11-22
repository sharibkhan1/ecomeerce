"use client"

import React from 'react'
import Heading from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { CategoryColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface CategoryClientProps{
  data:CategoryColumn[]
}

const CategoryClient:React.FC<CategoryClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
        <div className='flex items-center justify-between ' >
        <Heading
                title={`Categories (${data.length})`}
                description="Manage categories for your store"
        />
        <Button className='dark:shadow-black' variant="brutal"  onClick={()=> router.push(`/${params.storeId}/categories/673136c6efefd5ac6745b9f6`)} >
            <PlusIcon className='mr-2 h-4 w-4' />
            Add New
        </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data} />
        {/* <Heading
                title="API"
                description="API call for categories"
        />
        <Separator/>
        <ApiList entityName="categories" entityIdName="categoryId" /> */}
    </>
  )
}

export default CategoryClient