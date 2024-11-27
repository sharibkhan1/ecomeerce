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
    const sizes1 = await db.size1.findMany({
        where: {
            storeId: params.storeId
        }
    });const sizes2 = await db.size2.findMany({
        where: {
            storeId: params.storeId
        }
    });const sizes3 = await db.size3.findMany({
        where: {
            storeId: params.storeId
        }
    });
    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId
        }
    });
    const colors1 = await db.color1.findMany({
        where: {
            storeId: params.storeId
        }
    });
    const colors2 = await db.color2.findMany({
        where: {
            storeId: params.storeId
        }
    });
    const colors3 = await db.color3.findMany({
        where: {
            storeId: params.storeId
        }
    });
    // If product not found, pass null to initialData and details
    const initialData = product || null;
    const details = product?.details || [];

    return (
        <div className='flex-col dark:bg-[#09090B] min-h-screen flex'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductForm
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                    sizes1={sizes1}
                    sizes2={sizes2}
                    sizes3={sizes3}
                    colors1={colors1}
                    colors2={colors2}
                    colors3={colors3}
                    initialData={initialData}  // Will be null if no product is found
                    details={details}  // Will be empty if no product is found
                />
            </div>
        </div>
    );
};

export default ProductPage;
