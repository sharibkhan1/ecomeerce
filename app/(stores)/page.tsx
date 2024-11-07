import getProducts from '@/actions/ger-products';
import getBillboard from '@/actions/get-billboard';
import ProductList from '@/components/product-list';
import Billboard from '@/components/ui/billboard'
import Cont from '@/components/ui/cont'
import React from 'react'

export const revalidate = 0;

const StoreHome = async () => {
  const products = await getProducts({isFeatured:true})
  const billboard = await getBillboard("67278d28219f8cfaefa8c7ec")
  return (
    <Cont>
      <div className='space-y-10 pb-10 ' >
        <Billboard data={billboard} />
      
      <div className='flex-col flex gap-y-8 sm:px-6 lg:px-8' >
        <ProductList title="Featured Products" items={products} />
      </div>
      </div>
    </Cont>
  )
}

export default StoreHome