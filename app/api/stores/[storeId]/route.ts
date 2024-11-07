import { currentUserId } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        const userId =  await currentUserId();
        const body = await req.json();
        const {name} = body;

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
        if(!name){
            return new NextResponse("Name is required",{status:400});
        }
        if(!params.storeId){
            return new NextResponse("Store Id is required",{status:400});
        }
        const store= await db.store.updateMany({
            where:{
                id:params.storeId,
                userId
            },
            data:{
                name
            }
        });
        return NextResponse.json(store);
    }catch(e){
        console.log("[STORE_PATCH]",e);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        const userId =  await currentUserId();

        if(!userId){
            return new NextResponse("Unauthticared",{status:401});
        }
        if(!params.storeId){
            return new NextResponse("Store Id is required",{status:400});
        }
        const store= await db.store.deleteMany({
            where:{
                id:params.storeId,
                userId
            },
        });
        return NextResponse.json(store);
    }catch(e){
        console.log("[STORE_DELETE]",e);
        return new NextResponse("Internal error",{status:500});
    }
}