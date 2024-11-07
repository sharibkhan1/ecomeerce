// actions/get-colors.ts
import db from "@/lib/db";
import { Color } from "@/lib/types";

const getColors = async (): Promise<Color[]> => {
    const colors = await db.color.findMany();
    return colors;
};

export default getColors;
