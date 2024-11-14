// actions/get-billboard.ts
import db from "@/lib/db"; // Adjust this import based on your project structure

const getBillboard = async (label: string): Promise<string | null> => {
    const storeId = process.env.STORE_ID; // Get storeId from environment variable

    if (!storeId) {
        throw new Error("Store ID is not defined in the environment variables.");
    }

    // Fetch the billboard by label (using findFirst instead of findUnique)
    const billboard = await db.billboard.findFirst({
        where: {
            label: label, // Use the label to filter the billboard
        },
    });

    // If billboard is not found, return null instead of throwing an error
    return billboard ? billboard.imageUrl : null;
};

export default getBillboard;
