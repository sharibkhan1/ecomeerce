import getProducts from '@/actions/ger-products';
import getProduct from '@/actions/get-product';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import ReviewRating from '@/components/reviewrating';
import Cont from '@/components/ui/cont';
import NoResult from '@/components/ui/no-result';
import React from 'react'

interface ProductPageProps{
    params:{
        productId: string;
    }
}

const ProductPage:React.FC<ProductPageProps> = async ({params}) => {
  
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })

    return (
    <div className='bg-white' >
        <Cont>
            <div className='px-4 py-10 sm:px-6 lg:px-8' >
                <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 ' >
                    <Gallery images={product?.images || []}/>
                    <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 ' >
                    {product ? <Info data={product} /> : <NoResult/>}
                    </div>
                </div>
                <hr className='my-10' />
                <ProductList title='Related Items' items={suggestedProducts} />
                <ReviewRating productId={product?.id} existingReviews={product?.reviews}  />
            </div>
        </Cont>
    </div>
  )
}

export default ProductPage