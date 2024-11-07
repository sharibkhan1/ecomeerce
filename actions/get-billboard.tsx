// actions/get-billboard.ts
import db from "@/lib/db"; // Adjust this import based on your project structure
import { Billboard } from "@/lib/types";

const getBillboard = async (id: string): Promise<Billboard> => {
    const storeId = process.env.STORE_ID; // Get storeId from environment variable

    if (!storeId) {
        throw new Error("Store ID is not defined in the environment variables.");
    }

    // Fetch the billboard by ID and ensure it belongs to the specified store
    const billboard = await db.billboard.findUnique({
        where: {
            id: id,
        },
        // Optionally include the related store information if needed
    });

    if (!billboard) {
        throw new Error(`Billboard with ID ${id} not found.`);
    }

    return {
        id: billboard.id,
        label: billboard.label,
        imageUrl: billboard.imageUrl,
    };
};

export default getBillboard;
