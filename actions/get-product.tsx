// actions/get-product.ts
import db from "@/lib/db"; 
import { Product } from "@/lib/types";

const getProduct = async (productId: string): Promise<Product | null> => {
    const product = await db.product.findUnique({
        where: { id: productId },
        include: {
            category: {
                include: {
                    billboard: true,
                },
            },
            size: true,
            color: true,
            images: true,
            details: true,
            reviews: true,    
        },
    });

    return product;
};

export default getProduct;
