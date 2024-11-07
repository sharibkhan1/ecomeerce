// actions/get-sizes.ts
import db from "@/lib/db";
import { Size } from "@/lib/types";

const getSizes = async (): Promise<Size[]> => {
    const sizes = await db.size.findMany();
    return sizes;
};

export default getSizes;
