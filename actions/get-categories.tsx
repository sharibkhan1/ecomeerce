// actions/get-categories.ts
import db from "@/lib/db"; // Adjust this import based on your project structure
import { Category } from "@/lib/types";

const getCategories = async (): Promise<Category[]> => {
    const storeId = process.env.STORE_ID; // Get storeId from environment variable

    if (!storeId) {
        throw new Error("Store ID is not defined in the environment variables.");
    }

    // Fetch categories along with their related billboard
    const categories = await db.category.findMany({
        where: {
            storeId: storeId,
        },
        include: {
            billboard: true, // Include the billboard relation
        },
    });

    return categories.map(category => ({
        id: category.id,
        name: category.name,
        billboard: {
            id: category.billboard.id,
            label: category.billboard.label,
            imageUrl: category.billboard.imageUrl,
        },
        // Include other properties if needed
    }));
};

export default getCategories;
