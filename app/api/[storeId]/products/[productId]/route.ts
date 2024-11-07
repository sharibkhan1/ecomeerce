import { currentUserId } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params}:{params:{productId:string}}
){
    try{
        if(!params.productId){
            return new NextResponse("product Id is required",{status:400});
        }

        const product= await db.product.findUnique({
            where:{
                id:params.productId,
            },
            include:{
                images:true,
                category:true,
                color:true,
                size:true,
                details:true,
            },
        });
        return NextResponse.json(product);
    }catch(e){
        console.log("[product_GET]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string,productId:string}}
){
    try{
        const userId =  await currentUserId();
        const body = await req.json();
        const { name, price,isFeatured,isArchived,categoryId,colorId,sizeId,images, salesPrice, stocks, discription, details } = body;

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
        if (!salesPrice) {
            return new NextResponse("salesPrice is required", { status: 400 });
        }
        if (!name) {
            return new NextResponse("name is required", { status: 400 });
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
        if(!params.productId){
            return new NextResponse("product Id is required",{status:400});
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

        await db.product.update({
            where:{
                id:params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                discription,
                salesPrice,
                stocks: Number(stocks), // Convert stocks to number
                details: {
                    deleteMany:{}
                },
                storeId:params.storeId,
                images:{
                    deleteMany:{}
                },
                isFeatured,
                isArchived,
            },
        });

        const product =await db.product.update({
            where:{
                id:params.productId
            },
            data:{
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url:string})=>image)
                        ]
                    }
                }
            }
        });
        await db.product.update({
            where: {
                id: params.productId
            },
            data: {
                details: {
                    createMany: {
                        data: details.map((detail: { title: string; description: string }) => ({
                            title: detail.title,
                            description: detail.description
                        }))
                    }
                }
            }
        });
        return NextResponse.json(product);
    }catch(e){
        console.log("[product_PATCH]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string, productId:string}}
){
    try{
        const userId =  await currentUserId();

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
        if(!params.productId){
            return new NextResponse("product Id is required",{status:400});
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

        const product= await db.product.deleteMany({
            where:{
                id:params.productId,
            },
        });
        return NextResponse.json(product);
    }catch(e){
        console.log("[product_DELETE]",e);
        return new NextResponse("Internal error",{status:500});
    }
}