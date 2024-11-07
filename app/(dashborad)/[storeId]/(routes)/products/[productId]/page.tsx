import db from '@/lib/db'
import React from 'react'
import { ProductForm } from '../_components/product-form';

const ProductPage = async({
    params
}:{
    params:{productId: string, storeId:string}
}) => {
    // Fetch the product along with the images and details
    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true,
            details: true,  // Ensure that details are included
        }
    });

    // Fetch categories, sizes, and colors for the store
    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    });

    const sizes = await db.size.findMany({
        where: {
            storeId: params.storeId
        }
    });

    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId
        }
    });
    // If product not found, pass null to initialData and details
    const initialData = product || null;
    const details = product?.details || [];

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductForm
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                    initialData={initialData}  // Will be null if no product is found
                    details={details}  // Will be empty if no product is found
                />
            </div>
        </div>
    );
};

export default ProductPage;
