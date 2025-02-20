"use client"

import React from 'react'
import Heading from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { ProductColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface ProductClientProps{
  data:ProductColumn[]
}

const ProductClient:React.FC<ProductClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
        <div className='flex items-center justify-between ' >
        <Heading
                title={`Products (${data.length})`}
                description="Manage products for your store"
        />
        <Button className='dark:shadow-yellow-300' variant="brutal"  onClick={()=> router.push(`/${params.storeId}/products/673136c6efefd5ac6745b9f6`)} >
            <PlusIcon className='mr-2 h-4 w-4' />
            Add Nes
        </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data} >
          
        </DataTable>
        {/* <Heading
                title="API"
                description="API call for products"
        />
        <Separator/>
        <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  )
}

export default ProductClient