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
            color1:true,
            color2:true,
            color3:true,
            images: true,
            details: true,
            reviews: true, 
            size1:true,
            size2:true,
            size3:true,   
        },
    });

    return product;
};

export default getProduct;
