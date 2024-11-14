import { currentUserId } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params}:{params:{sizeId:string}}
){
    try{
        if(!params.sizeId){
            return new NextResponse("Size Id is required",{status:400});
        }

        const size= await db.size.findUnique({
            where:{
                id:params.sizeId,
            },
        });
        const size1= await db.size1.findUnique({
            where:{
                id:params.sizeId,
            },
        });
        const size2= await db.size2.findUnique({
            where:{
                id:params.sizeId,
            },
        });
        const size3= await db.size3.findUnique({
            where:{
                id:params.sizeId,
            },
        });
        return NextResponse.json(size);
    }catch(e){
        console.log("[size_GET]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string,sizeId:string}}
){
    try{
        const userId =  await currentUserId();
        const body = await req.json();
        const {name,value} = body;

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
                // Check if the name is provided
        if (!name) {
             return new NextResponse("name is required", { status: 400 });
        }
        
        if (!value) {
            return new NextResponse("value is required", { status: 400 });
        }

        if(!params.sizeId){
            return new NextResponse("size Id is required",{status:400});
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

        const size= await db.size.updateMany({
            where:{
                id:params.sizeId,
            },
            data:{
                name,
                value,
            }
        });
        const size1= await db.size1.updateMany({
            where:{
                id:params.sizeId,
            },
            data:{
                name,
                value,
            }
        });
        const size2= await db.size2.updateMany({
            where:{
                id:params.sizeId,
            },
            data:{
                name,
                value,
            }
        });
        const size3= await db.size3.updateMany({
            where:{
                id:params.sizeId,
            },
            data:{
                name,
                value,
            }
        });
        return NextResponse.json(size);
    }catch(e){
        console.log("[size_PATCH]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string, sizeId:string}}
){
    try{
        const userId =  await currentUserId();

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
        if(!params.sizeId){
            return new NextResponse("size Id is required",{status:400});
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

        const size= await db.size.deleteMany({
            where:{
                id:params.sizeId,
            },
        });
        const size1= await db.size1.deleteMany({
            where:{
                id:params.sizeId,
            },
        });
        const size2= await db.size2.deleteMany({
            where:{
                id:params.sizeId,
            },
        });
        const size3= await db.size3.deleteMany({
            where:{
                id:params.sizeId,
            },
        });
        return NextResponse.json(size);
    }catch(e){
        console.log("[size_DELETE]",e);
        return new NextResponse("Internal error",{status:500});
    }
}