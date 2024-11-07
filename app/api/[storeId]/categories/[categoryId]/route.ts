import { currentUserId } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params}:{params:{categoryId:string}}
){
    try{
        if(!params.categoryId){
            return new NextResponse("category Id is required",{status:400});
        }

        const category= await db.category.findUnique({
            where:{
                id:params.categoryId,
            },
        });
        return NextResponse.json(category);
    }catch(e){
        console.log("[category_GET]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string,categoryId:string}}
){
    try{
        const userId =  await currentUserId();
        const body = await req.json();
        const {name,billboardId} = body;

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
                // Check if the name is provided
        if (!name) {
             return new NextResponse("name is required", { status: 400 });
        }
        
        if (!billboardId) {
            return new NextResponse("billboard Id is required", { status: 400 });
        }

        if(!params.categoryId){
            return new NextResponse("category Id is required",{status:400});
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

        const category= await db.category.updateMany({
            where:{
                id:params.categoryId,
            },
            data:{
                name,
                billboardId,
            }
        });
        return NextResponse.json(category);
    }catch(e){
        console.log("[category_PATCH]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string, categoryId:string}}
){
    try{
        const userId =  await currentUserId();

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
        if(!params.categoryId){
            return new NextResponse("category Id is required",{status:400});
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

        const category= await db.category.deleteMany({
            where:{
                id:params.categoryId,
            },
        });
        return NextResponse.json(category);
    }catch(e){
        console.log("[category_DELETE]",e);
        return new NextResponse("Internal error",{status:500});
    }
}