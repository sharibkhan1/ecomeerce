import { currentUserId } from "@/lib/auth"; // Make sure this function is async if it needs to be awaited
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request,{params}:{params:{storeId:string}}) {
    try {
        // Await the currentUserId function to get the userId
        const userId = await currentUserId(); // Ensure this is awaited

        const body = await req.json();
        const { name, price,categoryId,colorId,sizeId,images ,isFeatured,isArchived,discription,salesPrice,stocks,details} = body;

        // Check if userId is available
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the name is provided
        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }
        if (!salesPrice) {
            return new NextResponse("salesPrice is required", { status: 400 });
        }
        if (!price) {
            return new NextResponse("price is required", { status: 400 });
        }
        if (!categoryId) {
            return new NextResponse("categoryId is required", { status: 400 });
        }
        if (!colorId) {
            return new NextResponse("colorId is required", { status: 400 });
        }
        if (!sizeId) {
            return new NextResponse("sizeId is required", { status: 400 });
        }
        if (!images || !images.length ) {
            return new NextResponse("images is required", { status: 400 });
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
        const product = await db.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                salesPrice,
                stocks: Number(stocks),
                discription,
                
                storeId:params.storeId,
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url:string})=>image)
                        ]
                    }
                },
                details: {
                    createMany: {
                      data: details.map((detail: { title: string; description: string }) => ({
                        title: detail.title,
                        description: detail.description,
                      })),
                    },
                  },
            },
        });

        // Return the created store as a JSON response
        return NextResponse.json(product);
    } catch (e) {
        console.log("[product_POST]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request,{params}:{params:{storeId:string}}) {
    try {
        const {searchParams} = new URL(req.url);
        const categoryId = searchParams.get("categoryId")|| undefined;
        const colorId = searchParams.get("colorId")|| undefined;
        const sizeId = searchParams.get("sizeId")|| undefined;
        const isFeatured = searchParams.get("isFeatured");
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 });
        }
        // Create a new store in the database
        const product = await db.product.findMany({
            where: {
                storeId:params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured? true: undefined,
                isArchived: false,
            },
            include:{
                images:true,
                category:true,
                color:true,
                size:true,
                details: true,
            },
            orderBy:{
                createdAt:"desc"
            }
        });

        // Return the created store as a JSON response
        return NextResponse.json(product);
    } catch (e) {
        console.log("[product_GET]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}

