// actions/get-category.ts
import db from "@/lib/db";
import { Category } from "@/lib/types";

const getCategory = async (categoryId: string): Promise<Category | null> => {
    const category = await db.category.findUnique({
        where: { id: categoryId },
        include: {
            billboard: true, // Include related billboard details if necessary
        },
    });
    return category;
};

export default getCategory;
