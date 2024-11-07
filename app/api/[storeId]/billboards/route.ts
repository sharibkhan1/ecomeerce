import { currentUserId } from "@/lib/auth"; // Make sure this function is async if it needs to be awaited
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request,{params}:{params:{storeId:string}}) {
    try {
        // Await the currentUserId function to get the userId
        const userId = await currentUserId(); // Ensure this is awaited

        const body = await req.json();
        const { label, imageUrl } = body;

        // Check if userId is available
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the name is provided
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
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
        const billboard = await db.billboard.create({
            data: {
                label,
                imageUrl,
                storeId:params.storeId,
            },
        });

        // Return the created store as a JSON response
        return NextResponse.json(billboard);
    } catch (e) {
        console.log("[BILLBOARD_POST]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request,{params}:{params:{storeId:string}}) {
    try {
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }
        // Create a new store in the database
        const billboards = await db.billboard.findMany({
            where: {
                storeId:params.storeId,
            },
        });

        // Return the created store as a JSON response
        return NextResponse.json(billboards);
    } catch (e) {
        console.log("[BILLBOARDS_GET]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

