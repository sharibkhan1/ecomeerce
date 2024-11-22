// actions/get-products.ts
import db from "@/lib/db"; // Adjust this import based on your project structure
import { Product } from "@/lib/types";

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    // Construct the filter based on the provided query parameters
    const filters: any = {
        ...(query.categoryId && { categoryId: query.categoryId }),
        ...(query.colorId && { colorId: query.colorId }), // Directly use colorId
        ...(query.sizeId && { sizeId: query.sizeId }),   // Directly use sizeId
        ...(query.isFeatured !== undefined && { isFeatured: query.isFeatured }),
    };

    // Fetch products from the database with the constructed filters
    const products = await db.product.findMany({
        where: filters,
        include: {
            category: {
                include: {
                    billboard: true,
                },
            },
            size: true,
            size1: true,
            size2: true,
            size3: true,
            color: true,
            color1:true,
            color2:true,
            color3:true,
            images: true,
            details: true, // Include details
            reviews: true, 
        },
    });
// @ts-expect-error
    return products;
};

export default getProducts;

