import { currentUserId } from "@/lib/auth"; // Make sure this function is async if it needs to be awaited
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Await the currentUserId function to get the userId
        const userId = await currentUserId(); // Ensure this is awaited

        const body = await req.json();
        const { name } = body;

        // Check if userId is available
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the name is provided
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        // Create a new store in the database
        const store = await db.store.create({
            data: {
                name,
                userId, // This should now be a string
            },
        });

        // Return the created store as a JSON response
        return NextResponse.json(store);
    } catch (e) {
        console.log("[STORES_POST]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
