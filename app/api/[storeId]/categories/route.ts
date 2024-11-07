import { currentUserId } from "@/lib/auth"; // Make sure this function is async if it needs to be awaited
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request,{params}:{params:{storeId:string}}) {
    try {
        // Await the currentUserId function to get the userId
        const userId = await currentUserId(); // Ensure this is awaited

        const body = await req.json();
        const { name, billboardId } = body;

        // Check if userId is available
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the name is provided
        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("billboard Id is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }

        const storeByUserId = await db.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Create a new store in the database
        const category = await db.category.create({
            data: {
                name,
                billboardId,
                storeId:params.storeId,
            },
        });

        // Return the created store as a JSON response
        return NextResponse.json(category);
    } catch (e) {
        console.log("[CATEGORY_POST]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request,{params}:{params:{storeId:string}}) {
    try {
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }
        // Create a new store in the database
        const category = await db.category.findMany({
            where: {
                storeId:params.storeId,
            },
        });

        // Return the created store as a JSON response
        return NextResponse.json(category);
    } catch (e) {
        console.log("[CATEGORY_GET]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

