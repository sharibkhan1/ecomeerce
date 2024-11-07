import { currentUserId } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params}:{params:{colorId:string}}
){
    try{
        if(!params.colorId){
            return new NextResponse("color Id is required",{status:400});
        }

        const color= await db.color.findUnique({
            where:{
                id:params.colorId,
            },
        });
        return NextResponse.json(color);
    }catch(e){
        console.log("[color_GET]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string,colorId:string}}
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

        if(!params.colorId){
            return new NextResponse("color Id is required",{status:400});
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

        const color= await db.color.updateMany({
            where:{
                id:params.colorId,
            },
            data:{
                name,
                value,
            }
        });
        return NextResponse.json(color);
    }catch(e){
        console.log("[color_PATCH]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string, colorId:string}}
){
    try{
        const userId =  await currentUserId();

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
        if(!params.colorId){
            return new NextResponse("color Id is required",{status:400});
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

        const color= await db.color.deleteMany({
            where:{
                id:params.colorId,
            },
        });
        return NextResponse.json(color);
    }catch(e){
        console.log("[color_DELETE]",e);
        return new NextResponse("Internal error",{status:500});
    }
}